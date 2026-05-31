# Phần A: 

## Câu A1:

Thứ tự output:

```
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

Cơ chế hoạt động

| Queue           | Loại       | Ví dụ                   | Ưu tiên                         |
| --------------- | ---------- | ----------------------- | ------------------------------- |
| Call Stack      | Đồng bộ    | console.log             | Chạy ngay                       |
| Microtask Queue | Async nhẹ  | Promise.then            | Sau Call Stack, trước Macrotask |
| Macrotask Queue | Async nặng | setTimeout, setInterval | Sau khi Microtask Queue trống   |

- Event Loop: JS single-threaded, sau khi Call Stack trống → chạy hết Microtask → lấy 1 Macrotask → lặp lại.
- Microtask Queue: `Promise.then` — ưu tiên cao, chạy hết trước khi lấy Macrotask.
- Macrotask Queue: `setTimeout` — chạy từng cái một, xen kẽ sau mỗi lần drain Microtask.

## Câu A2:
1. await fetch()
fetch trả về: Một Promise chứa đối tượng Response (mới chỉ có thông tin tổng quan như Header, Status; chưa có dữ liệu).

Tại sao cần await: Vì gửi yêu cầu qua Internet cần thời gian, phải đợi mạng phản hồi xong mới chạy tiếp.

2. response.ok bằng false khi nào?
Khi mã HTTP trả về nằm ngoài khoảng 200 - 299 (yêu cầu đến được server nhưng thất bại).

3 mã lỗi phổ biến: 404 (Không tìm thấy trang), 500 (Server lỗi code), 403 (Không có quyền truy cập).

3. Tại sao response.json() lại cần await lần nữa?
Vì ở bước 1, nội dung sản phẩm (Body) vẫn chưa tải xong mà đang là luồng dữ liệu thô.

.json() vừa phải đợi tải nốt phần dữ liệu thô, vừa phải chuyển chuỗi JSON đó thành Object JS. Quá trình này tốn thời gian và trả về một Promise mới nên phải await.

4. try...catch gom được những lỗi gì?
Lỗi mạng: Mất Wi-Fi, đứt cáp, sai tên miền.

Lỗi HTTP (404, 500): Do dòng if (!response.ok) throw... của bạn chủ động ép nó nhảy xuống catch.

Lỗi định dạng dữ liệu: API lỗi trả về chữ hoặc code HTML khiến hàm .json() bị lỗi (không parse được).

## Câu A3:
1. Sơ đồ 3 trạng thái của Promise
Một Promise trong JavaScript luôn nằm trong 1 trong 3 trạng thái dưới đây. Khi đã chuyển từ Pending sang Fulfilled hoặc Rejected, trạng thái này là vĩnh viễn và không thể thay đổi ngược lại.

```
                    ┌─────────────┐
                    │   PENDING   │  ← Đang chờ (chưa có kết quả)
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
     ┌─────────────────┐       ┌─────────────────┐
     │    FULFILLED    │       │    REJECTED     │
     │  (resolve)      │       │  (reject)       │
     │  .then() chạy   │       │  .catch() chạy  │
     └─────────────────┘       └─────────────────┘
```
2. Callback Hell là gì?
Callback Hell (hay còn gọi là Pyramid of Doom - Kim tự tháp chết chóc) là hiện tượng các hàm bất đồng bộ lồng nhau quá nhiều tầng thông qua các hàm callback.   
 Ví dụ 4 cấp Callback HellGiả sử bạn cần thực hiện chuỗi hành động liên tiếp: 
 
```javascript
loginUser(
  "user@email.com",
  "123456",
  function (user) {
    getUserProfile(
      user.id,
      function (profile) {
        getOrders(
          profile.id,
          function (orders) {
            getOrderDetail(
              orders[0].id,
              function (detail) {
                console.log("Chi tiết đơn hàng:", detail);
              },
              function (err) {
                console.error("Lỗi lấy chi tiết:", err);
              },
            );
          },
          function (err) {
            console.error("Lỗi lấy đơn hàng:", err);
          },
        );
      },
      function (err) {
        console.error("Lỗi lấy profile:", err);
      },
    );
  },
  function (err) {
    console.error("Lỗi đăng nhập:", err);
  },
);
```

4. Refactor thành async/await

```javascript
async function loadOrderDetail() {
  try {
    const user = await loginUser("user@email.com", "123456");
    const profile = await getUserProfile(user.id);
    const orders = await getOrders(profile.id);
    const detail = await getOrderDetail(orders[0].id);

    console.log("Chi tiết đơn hàng:", detail);
  } catch (err) {
    console.error("Lỗi:", err.message);
  }
}
```

# PHẦN C 

# Câu C1

Trong ứng dụng E-Commerce, lỗi API là điều xảy ra thường xuyên. Một chiến lược xử lý lỗi tốt giúp tăng trải nghiệm người dùng và đảm bảo hệ thống ổn định.

---

## 1. Network Errors

### Nguyên nhân

* Mất kết nối Internet
* DNS lỗi
* WiFi bị ngắt
* Server không thể truy cập

### Cách xử lý

* Hiển thị thông báo thân thiện
* Cho phép người dùng thử lại
* Retry tự động với các request quan trọng
* Lưu dữ liệu tạm thời nếu cần

### Ví dụ

```js id="c1n1"
try {
    const response = await fetch("/api/products");
} catch (error) {
    showMessage("Không có kết nối Internet.");
}
```

---

## 2. API Errors

### 404 Not Found

Nguyên nhân:

```text id="c1n2"
Sản phẩm không tồn tại
URL sai
```

Xử lý:

```js id="c1n3"
if (response.status === 404) {
    showMessage("Không tìm thấy dữ liệu.");
}
```

---

### 500 Internal Server Error

Nguyên nhân:

```text id="c1n4"
Lỗi phía server
Database lỗi
```

Xử lý:

```js id="c1n5"
if (response.status === 500) {
    showMessage("Hệ thống đang bảo trì.");
}
```

---

### 429 Too Many Requests

Nguyên nhân:

```text id="c1n6"
Gửi quá nhiều request trong thời gian ngắn
```

Xử lý:

```js id="c1n7"
if (response.status === 429) {
    showMessage("Bạn thao tác quá nhanh. Vui lòng thử lại sau.");
}
```

---

## 3. Timeout (> 10 giây)

Nếu API phản hồi quá chậm, ứng dụng không nên chờ vô hạn.

### fetchWithTimeout()

```js id="c1n8"
async function fetchWithTimeout(url, ms = 10000) {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, ms);

    try {
        const response = await fetch(url, {
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}
```

### Sử dụng

```js id="c1n9"
try {
    const response = await fetchWithTimeout(
        "/api/products",
        10000
    );
} catch (error) {
    console.log("Request timeout");
}
```

---

## 4. Retry Logic

Nếu lỗi do mạng thì thử lại tối đa 3 lần.

### fetchWithRetry()

```js id="c1n10"
async function fetchWithRetry(url, maxRetries = 3) {

    for (let attempt = 1; attempt <= maxRetries; attempt++) {

        try {

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            return response;

        } catch (error) {

            if (attempt === maxRetries) {
                throw error;
            }

            console.log(
                `Retry ${attempt}/${maxRetries}`
            );
        }
    }
}
```

### Sử dụng

```js id="c1n11"
try {

    const response =
        await fetchWithRetry("/api/products", 3);

    const data = await response.json();

} catch (error) {

    console.log("Retry thất bại");

}
```

---

## Kết luận

| Loại lỗi          | Cách xử lý                     |
| ----------------- | ------------------------------ |
| Network Error     | Thông báo + Retry              |
| 404               | Hiển thị dữ liệu không tồn tại |
| 500               | Thông báo lỗi hệ thống         |
| 429               | Giới hạn request, thử lại sau  |
| Timeout           | Abort request                  |
| Mất mạng tạm thời | Retry tối đa 3 lần             |

---

# Câu C2:

## So sánh

| Method               | Khi nào resolve?            | Khi nào reject?         | Use case                    |
| -------------------- | --------------------------- | ----------------------- | --------------------------- |
| Promise.all()        | Tất cả promise thành công   | Chỉ cần 1 promise fail  | Load nhiều dữ liệu bắt buộc |
| Promise.allSettled() | Tất cả promise hoàn thành   | Không reject            | Thu thập mọi kết quả        |
| Promise.race()       | Promise đầu tiên hoàn thành | Promise đầu tiên reject | Timeout, mirror servers     |
| Promise.any()        | Promise đầu tiên resolve    | Tất cả promise reject   | Tìm nguồn dữ liệu khả dụng  |

---

# 1. Promise.all()

### Scenario

Trang Product Detail cần:

* Thông tin sản phẩm
* Đánh giá
* Danh mục liên quan

Tất cả đều bắt buộc.

```js id="c2n1"
const [product, reviews, related] =
    await Promise.all([
        fetch("/api/product/1").then(r => r.json()),
        fetch("/api/reviews/1").then(r => r.json()),
        fetch("/api/related/1").then(r => r.json())
    ]);
```

Nếu một request fail:

```text id="c2n2"
Promise.all reject ngay lập tức
```

---

# 2. Promise.allSettled()

### Scenario

Dashboard quản trị:

* Doanh thu
* Người dùng
* Đơn hàng

Một widget lỗi vẫn muốn hiển thị các widget khác.

```js id="c2n3"
const results =
    await Promise.allSettled([
        fetch("/api/revenue"),
        fetch("/api/users"),
        fetch("/api/orders")
    ]);
```

Ví dụ kết quả:

```js id="c2n4"
[
  { status: "fulfilled" },
  { status: "rejected" },
  { status: "fulfilled" }
]
```

Dashboard vẫn hoạt động.

---

# 3. Promise.race()

### Scenario

Timeout API sau 5 giây.

```js id="c2n5"
const timeoutPromise =
    new Promise((_, reject) =>
        setTimeout(
            () => reject(new Error("Timeout")),
            5000
        )
    );

const response =
    await Promise.race([
        fetch("/api/products"),
        timeoutPromise
    ]);
```

Nếu API quá chậm:

```text id="c2n6"
Timeout trước → reject
```

---

### Scenario khác

Nhiều server mirror:

```js id="c2n7"
const data =
    await Promise.race([
        fetch("server-a/api"),
        fetch("server-b/api"),
        fetch("server-c/api")
    ]);
```

Lấy kết quả từ server phản hồi nhanh nhất.

---

# 4. Promise.any()

### Scenario

Ứng dụng CDN đa vùng.

```js id="c2n8"
const image =
    await Promise.any([
        fetch("cdn-us/image.jpg"),
        fetch("cdn-eu/image.jpg"),
        fetch("cdn-asia/image.jpg")
    ]);
```

Chỉ cần một CDN hoạt động.

---

### Khi nào reject?

```text id="c2n9"
Tất cả promises đều reject
```

Ví dụ:

```js id="c2n10"
Promise.any([
    Promise.reject(),
    Promise.reject(),
    Promise.reject()
]);
```

Kết quả:

```text id="c2n11"
AggregateError
```

---

# Tổng kết

### Promise.all

```text id="c2n12"
Tất cả phải thành công
```

Phù hợp:

```text id="c2n13"
Product page
Checkout page
```

---

### Promise.allSettled

```text id="c2n14"
Thu thập mọi kết quả
```

Phù hợp:

```text id="c2n15"
Dashboard
Analytics
```

---

### Promise.race

```text id="c2n16"
Lấy promise hoàn thành đầu tiên
```

Phù hợp:

```text id="c2n17"
Timeout
Mirror servers
```

---

### Promise.any

```text id="c2n18"
Lấy promise resolve đầu tiên
```

Phù hợp:

```text id="c2n19"
CDN
Fallback APIs
High availability systems
```

Link video: 