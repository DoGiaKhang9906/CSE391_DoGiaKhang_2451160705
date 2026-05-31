# Phần A: Kiểm tra đọc hiểu

## Câu A1 

1. Sơ đồ DOM Tree

```
document
└── div#app
    ├── header
    │   ├── h1
    │   │   └── "Todo App"
    │   └── nav
    │       ├── a.active
    │       │   └── "All"
    │       ├── a
    │       │   └── "Active"
    │       └── a
    │           └── "Completed"
    └── main
        ├── form#todoForm
        │   ├── input#todoInput
        │   └── button
        │       └── "Add"
        └── ul#todoList
            ├── li.todo-item
            │   └── "Learn HTML"
            └── li.todo-item.completed
                └── "Learn CSS"
```

2. querySelector

- Chọn thẻ h1

```javascript
document.querySelector("h1");
```

- Chọn input trong form

```javascript
document.querySelector("#todoForm input");
```

- Chọn tất cả .todo-item

```javascript
document.querySelectorAll(".todo-item");
```

- Chọn link đang active

```javascript
document.querySelector("a.active");
```

- Chọn li đầu tiên trong #todoList

```javascript
document.querySelector("#todoList li");
```

- Chọn tất cả a bên trong nav

```javascript
document.querySelectorAll("nav a");
```

## Câu A2:
1. so sánh
|                 | textContent                 | innerHTML                        |
| --------------- | --------------------------- | ---------------------------------|
| Đọc/ghi         | Text thuần                  | HTML có thể parse                |
| Tốc độ          | Nhanh hơn                   | Chậm hơn                         |
| Bảo mật         | An toàn                     | Nguy hiểm nếu dùng với user input|
| Render tag HTML | Không (hiển thị nguyên văn) | Có                               |

2. Ví dụ:
- Dùng innerHTML: Khi bạn thực sự muốn tạo ra giao diện, render các thẻ HTML động từ mã JavaScript.

```javascript
element.textContent = "<b>Hello</b>"; // Hiển thị: <b>Hello</b>
element.innerHTML = "<b>Hello</b>"; // Hiển thị: Hello (in đậm)
```

- Dùng textContent: Khi bạn chỉ muốn hiển thị nội dung văn bản đơn thuần, đặc biệt là dữ liệu do người dùng nhập vào.

3. Tại sao innerHTML gây XSS?
Vì innerHTML buộc trình duyệt phải biên dịch chuỗi thành DOM. Nếu chuỗi chứa mã độc như `<script>` hoặc `<img onerror="...">`, trình duyệt sẽ chạy mã đó ngay lập tức, giúp hacker đánh cắp dữ liệu hoặc phá hoại trang web.
4. Cách sửa code (Fix)
Sử dụng textContent để ép trình duyệt hiểu input chỉ là một đoạn văn bản bình thường, vô hiệu hóa mã độc.

Sửa:

```javascript
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput;
```
## Câu A3:
1. Khi click vào button (Mặc định)
Output:
```
BUTTON
INNER
OUTER
```
Giải thích: Theo mặc định, addEventListener sử dụng cơ chế Event Bubbling (Nổi bọt sự kiện). Khi bạn click vào `<button>`, sự kiện click sẽ kích hoạt tại chính nó trước, sau đó "nổi bọt" ngược lên các phần tử cha theo thứ tự từ trong ra ngoài: #btn $\rightarrow$ #inner $\rightarrow$ #outer.

2. Khi uncomment e.stopPropagation()
```
BUTTON
```

- Lý do: e.stopPropagation() dừng event tại #btn, không cho nổi lên các phần tử cha #inner và #outer không nhận được event → không log gì.

## Phần C:

# Câu C1 
### Lỗi 1: Sai event name

Code sai:

```js
document.querySelector("#decrementBtn").addEventListener("onclick", function() {
```

Sửa:

```js
document.querySelector("#decrementBtn").addEventListener("click", function() {
```

Giải thích: `addEventListener()` sử dụng `"click"` chứ không phải `"onclick"`.

---

### Lỗi 2: Gán lại biến const

Code:

```js
const countDisplay = document.querySelector(".count");
```

Sau đó:

```js
countDisplay = count;
```

Không hợp lệ vì `countDisplay` là const.

---

### Lỗi 3: Hiển thị count sai

Code sai:

```js
countDisplay = count;
```

Sửa:

```js
countDisplay.textContent = count;
```

Giải thích: cần cập nhật nội dung phần tử DOM.

---

### Lỗi 4: Xóa history bằng null

Code:

```js
historyList.innerHTML = null;
```

Sửa:

```js
historyList.innerHTML = "";
```

Giải thích: nên dùng chuỗi rỗng để xóa nội dung.

---

### Lỗi 5: remove chưa được gọi

Code sai:

```js
item.remove;
```

Sửa:

```js
item.remove();
```

Giải thích: `remove()` là hàm nên phải có dấu ngoặc.

---

### Lỗi 6: count từ localStorage là string

Code:

```js
count = localStorage.getItem("count");
```

Sửa:

```js
count = Number(localStorage.getItem("count")) || 0;
```

Giải thích: localStorage luôn trả về string.

---

### Lỗi 7: Không load lại history

Code hiện tại:

```js
window.addEventListener("load", () => {
    count = localStorage.getItem("count");
    countDisplay.textContent = count;
});
```

Sửa:

```js
window.addEventListener("load", () => {
    count = Number(localStorage.getItem("count")) || 0;
    countDisplay.textContent = count;

    historyList.innerHTML =
        localStorage.getItem("history") || "";
});
```

Giải thích: cần khôi phục lịch sử đã lưu.

---

### Lỗi 8: History sau khi load mất sự kiện click

Khi load từ localStorage:

```js
historyList.innerHTML =
    localStorage.getItem("history") || "";
```

các thẻ `<li>` được tạo lại nhưng không còn event listener.

Cách sửa tốt hơn:

```js
historyList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        deleteHistory(e.target);
    }
});
```

Đây là kỹ thuật Event Delegation.

---

## Kết luận

Tìm được 8 lỗi:

1. Sai event name (`onclick`)
2. Gán lại biến const
3. Cập nhật DOM sai cách
4. Xóa HTML bằng null
5. Thiếu `()`
6. localStorage trả về string
7. Không restore history
8. Event listener bị mất sau reload

---

# Câu C2 

## Tại sao bind event cho 1000 elements là bad practice?

Ví dụ:

```js
items.forEach(item => {
    item.addEventListener("click", handler);
});
```

Nếu có 1000 phần tử:

* Tạo 1000 event listener
* Tốn bộ nhớ
* Khó quản lý
* Giảm hiệu năng khi DOM lớn

---

## Event Delegation giải quyết thế nào?

Thay vì gắn listener cho từng phần tử:

```js
parent.addEventListener("click", (e) => {
    if (e.target.matches(".item")) {
        console.log(e.target.textContent);
    }
});
```

Chỉ cần:

* 1 listener duy nhất
* Tiết kiệm bộ nhớ
* Hoạt động cả với phần tử tạo động

## Refactor bằng DocumentFragment

Code ban đầu:

```js
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);
}
```

Mỗi lần `appendChild()`:

* DOM thay đổi
* Browser phải tính toán layout
* Có thể gây reflow nhiều lần

### Phiên bản tối ưu

```js
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
}

document.body.appendChild(fragment);
```

## Tại sao nhanh hơn?

`DocumentFragment` tồn tại ngoài DOM thật.



Link video: 