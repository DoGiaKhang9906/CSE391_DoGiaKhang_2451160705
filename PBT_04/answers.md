# Phần A: Kiểm tra đọc hiểu

## Câu A1 — 5 Loại Positioning

| Position   | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí                          | Cuộn theo trang?                        | Use case                                  |
| ---------- | ------------------------- | ------------------------------------------ | --------------------------------------- | ----------------------------------------- |
| `static`   | Có                        | Không dùng `top/left/right/bottom`         | Có                                      | Mặc định, không cần can thiệp             |
| `relative` | Có                        | Vị trí gốc của chính nó                    | Có                                      | Dịch chuyển nhẹ, làm mốc cho absolute con |
| `absolute` | Không                     | Thẻ cha gần nhất có `position` khác static | Có — cuộn theo document/container chứa nó | Badge trên icon, dropdown, tooltip        |
| `fixed`    | Không                     | Cửa sổ trình duyệt                         | Không — luôn dính tại chỗ               | Chat button, modal overlay                |
| `sticky`   | Có → Không (khi dính)     | Cửa sổ trình duyệt (sau khi đạt ngưỡng)    | Có → Không (dính khi scroll đến ngưỡng) | Sticky header, sidebar                    |

### Giải thích thêm

- `position: absolute` sẽ tự leo lên cây HTML để tìm thẻ cha gần nhất có `position` khác `static`.
- Nếu tìm thấy thì dùng thẻ đó làm gốc tính tọa độ.
- Nếu leo hết lên mà không thấy thì tính từ `body`.

### Nearest positioned ancestor

"Nearest positioned ancestor" là thẻ cha gần nhất có khai báo:

```css
position: relative;
position: absolute;
position: fixed;
position: sticky;
```

vì mặc định `static` sẽ bị bỏ qua.

### Sticky lưu ý quan trọng

`sticky` chỉ hoạt động khi có:

```css
top
bottom
left
right
```

Ví dụ:

```css
.header {
  position: sticky;
  top: 0;
}
```

---

## Câu A2 — Flexbox vs Grid

### 1. Trường hợp 1

```css
.container {
  display: flex;
}

.item {
  flex: 1;
}

/* 4 items */
```

```text
┌─────────────────────────────────────────────────────┐
│  CONTAINER (100% width)                             │
│ ┌──────────┬──────────┬──────────┬──────────┐       │
│ │  Item 1  │  Item 2  │  Item 3  │  Item 4  │       │
│ │  (25%)   │  (25%)   │  (25%)   │  (25%)   │       │
│ └──────────┴──────────┴──────────┴──────────┘       │
└─────────────────────────────────────────────────────┘
```

### Giải thích

- `display: flex` → các item xếp thành 1 hàng ngang (`flex-direction: row`)
- `flex: 1` tương đương:

```css
flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;
```

- Tất cả item cùng `flex: 1`
→ chia đều không gian còn lại theo chiều ngang
- 4 items → mỗi item khoảng 25%

---

### 2. Trường hợp 2

```css
.container {
  display: flex;
  flex-wrap: wrap;
}

.item {
  width: 45%;
  margin: 2.5%;
}

/* 6 items */
```

```text
┌─────────────────────────────────────────────────────┐
│  CONTAINER                                          │
│  ┌───────────────┐  ┌───────────────┐               │
│  │    Item 1     │  │    Item 2     │               │
│  │  (45% + 5%m)  │  │  (45% + 5%m)  │               │
│  └───────────────┘  └───────────────┘               │
│  ┌───────────────┐  ┌───────────────┐               │
│  │    Item 3     │  │    Item 4     │               │
│  └───────────────┘  └───────────────┘               │
│  ┌───────────────┐  ┌───────────────┐               │
│  │    Item 5     │  │    Item 6     │               │
│  └───────────────┘  └───────────────┘               │
└─────────────────────────────────────────────────────┘
```

### Giải thích

- Mỗi item chiếm:

```text
45% width
+ 2.5% margin trái
+ 2.5% margin phải
= 50%
```

- `flex-wrap: wrap`
→ khi không đủ chỗ thì item sẽ xuống hàng
- 100% ÷ 50% = 2 item mỗi hàng
- 6 items → 3 hàng

### Ghi chú thực tế

Ngoài thực tế thường ưu tiên dùng:

- `gap`
- `flex-basis`

thay vì cộng `margin` thủ công để tránh overflow và responsive dễ hơn.

Ví dụ hiện đại hơn:

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.item {
  flex: 1 1 calc(50% - 20px);
}
```

---

### 3. Trường hợp 3

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 3 items */
```

```text
┌─────────────────────────────────────────────────────┐
│  CONTAINER                                          │
│                                                     │
│  ┌────────┐          ┌────────┐          ┌────────┐ │
│  │ Item 1 │          │ Item 2 │          │ Item 3 │ │
│  └────────┘          └────────┘          └────────┘ │
│    (trái)             (giữa)               (phải)   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Giải thích

- `justify-content: space-between`
→ item đầu sát trái
→ item cuối sát phải
→ khoảng cách giữa các item bằng nhau

- `align-items: center`
→ căn giữa theo chiều dọc

- Thường dùng cho:
  - navbar
  - header
  - menu điều hướng

# Phần C: Suy luận

## Câu C1 — Flexbox vs Grid: Khi nào dùng gì?

1. Navigation bar ngang (logo + menu + buttons)

- Dùng: Flexbox
- Navbar là 1 chiều — các item xếp ngang theo trục X. Flexbox sinh ra để xử lý đúng kiểu này: `justify-content: space-between` đẩy logo trái, menu giữa, buttons phải. `align-items: center` căn giữa dọc hoàn hảo chỉ 1 dòng

2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)

- Dùng: Grid
- Cần layout 2 chiều rõ ràng — 3 cột cố định, ảnh tự động xuống hàng. `grid-template-columns: repeat(3, 1fr)` xử lý gọn, không cần biết có bao nhiêu ảnh. Flexbox cũng làm được nhưng phải tính `calc()` thủ công, dễ lệch.

3. Layout blog: main content + sidebar

- Dùng: Grid
- Đây là layout 2 vùng rõ ràng với kích thước khác nhau, ví dụ `grid-template-columns: 1fr 300px`. Grid kiểm soát tỷ lệ 2 cột chính xác hơn, dễ responsive hơn khi dùng `minmax()`.

4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)

- Dùng: Grid hoặc Flexbox — cả hai đều được
- Nếu 4 cột đều nhau: Flexbox với `flex: 1` đơn giản hơn. Nếu cần kiểm soát từng cột khác nhau (cột 1 rộng hơn, cột 4 hẹp hơn): Grid rõ ràng hơn. Thực tế dùng Grid cho chắc vì dễ responsive sau này.

5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)

- Dùng: Flexbox
- Card là layout 1 chiều theo trục dọc — `flex-direction: column`. Trick quan trọng: `margin-top: auto` trên nút "Mua" đẩy nút xuống đáy card bất kể nội dung text dài hay ngắn. Grid không có cách xử lý tự nhiên cho trick này.


## Câu C2 — Debug Flexbox

1. Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống

- Nguyên nhân: card không có `display: flex; flex-direction: column` nên các phần tử bên trong xếp bình thường, nút không có cách để dính đáy.
- Sửa:

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
}
.card {
  width: 30%;
  margin: 1.5%;
  display: flex; /* thêm */
  flex-direction: column; /* thêm */
}
.card img {
  width: 100%;
}
.card h3 {
  font-size: 18px;
}
.card .btn {
  padding: 10px;
  margin-top: auto; /* thêm — đẩy nút xuống đáy */
}
```

2. Lỗi 2: Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên

- Nguyên nhân: `display: flex` tạo flex container nhưng không có `justify-content` và `align-items` nên mặc định là `flex-start` — tức góc trái trên.

- Sửa:

```css
.hero {
  height: 100vh;
  display: flex;
  justify-content: center; /* thêm — căn giữa ngang */
  align-items: center; /* thêm — căn giữa dọc */
}
.hero-content {
  text-align: center;
}
```

3. Lỗi 3: Sidebar bị co lại khi content quá dài

- Nguyên nhân: Flexbox mặc định cho phép các item co lại (`flex-shrink: 1`). Khi content dài, flex container cố chia đều chỗ, sidebar bị ép nhỏ hơn 250px.

- Sửa:

```css
.layout {
  display: flex;
}
.sidebar {
  width: 250px;
  flex-shrink: 0; /* thêm — không cho co lại */
}
.content {
  flex: 1;
}
```

Link video: https://drive.google.com/file/d/1RPZDGRcN8v0YfsGPFzMi-dvER7sdi8es/view?usp=sharing