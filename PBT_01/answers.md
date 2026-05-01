## Phần A: Đọc hiểu

 Câu A1:

Khi gõ https://shopee.vn vào trình duyệt và nhấn Enter, các bước xảy ra theo thứ tự:

1. **DNS Lookup**: Trình duyệt hỏi DNS Server "shopee.vn là IP nào?" và nhận về địa chỉ IP của server.

2. **Thiết lập kết nối TCP**: Trình duyệt tạo kết nối với server thông qua Internet (3-way handshake).

3. **TLS Handshake (HTTPS)**: Thiết lập kết nối bảo mật, trao đổi chứng chỉ và mã hóa dữ liệu.

4. **Gửi HTTP Request**: Trình duyệt gửi yêu cầu (GET) đến server để lấy nội dung trang web.

5. **Server xử lý và trả về HTTP Response**: Server xử lý yêu cầu và gửi lại các file như HTML, CSS, JavaScript.

6. **Parse HTML, CSS & execute JavaScript**: Trình duyệt đọc HTML (cấu trúc), CSS (giao diện) và xử lý JavaScript.

7. **Render (hiển thị)**: Trình duyệt hoàn thiện và hiển thị giao diện trang web lên màn hình.

nguồn tham chiếu: 01_introduction_html_universe.md

Tab Network cho thấy toàn bộ các request mà trình duyệt gửi đi khi tải trang
![Network Screenshot](CauA1-1.png)

Câu A2:
1. **Sử dụng `<div>` thay cho `<header>`**
   - Phần đầu trang (logo, menu) không dùng thẻ semantic phù hợp.

2. **Không dùng `<nav>` cho menu**
   - Menu điều hướng nên dùng thẻ `<nav>` để Google hiểu đây là thanh điều hướng.

3. **Không dùng `<main>` cho nội dung chính**
   - Nội dung chính đang để trong `<div class="main">` thay vì `<main>`.

4. **Không dùng `<section>` hoặc `<article>` cho sản phẩm**
   - Mỗi sản phẩm nên là một `<article>` để thể hiện nội dung độc lập.

5. **Không dùng heading (h1, h2) cho tiêu đề**
   - "iPhone 16 Pro" nên là `<h2>` hoặc `<h1>` thay vì `<div>`.

6. **Không có thuộc tính alt cho ảnh**
   - Thẻ `<img> `thiếu alt → ảnh hưởng SEO và accessibility.

7. **Không dùng `<footer>`**
   - Phần cuối trang nên dùng thẻ `<footer>` thay vì `<div>`.

**Sửa lại lỗi**

```html
<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
    </nav>
</header>

<main>
    <section class="products">
        <article class="product">
            <h2>iPhone 16 Pro</h2>
            <p class="price">25.990.000đ</p>
            <img src="iphone.jpg" alt="iPhone 16 Pro">
        </article>
    </section>
</main>

<footer>
    <p>© 2026 ShopTLU</p>
</footer>
```

câu A3:
┌─────────────┐
│ Hộp 1 │ ← div: chiếm cả hàng
└─────────────┘
Text A Text B ← span: nằm cùng hàng nhau
┌─────────────┐
│ Hộp 2 │ ← div: xuống hàng mới
└─────────────┘
Text C Text D ← span + strong: cùng hàng, Text D in đậm
┌─────────────┐
│ Hộp 3 │ ← div: xuống hàng mới
└─────────────┘

Câu A4:
### Sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`
- `<thead>` (Table Head):
  - Chứa phần tiêu đề của bảng
  - Thường gồm các hàng `<tr>` chứa `<th>`
  - Giúp xác định cột và ý nghĩa dữ liệu

- `<tbody>` (Table Body):
  - Chứa nội dung chính của bảng
  - Bao gồm các hàng dữ liệu `<tr>` với `<td>`

- `<tfoot>` (Table Foot):
  - Chứa phần cuối bảng (tổng kết, ghi chú,…)
  - Thường dùng để hiển thị tổng, thống kê
### Tại sao KHÔNG nên dùng `<table>` để tạo layout
1. **Không đúng ngữ nghĩa (semantic)**
   - `<table>` cho dữ liệu dạng bảng, không phải để bố cục trang
   - Làm công cụ tìm kiếm khó hiểu cấu trúc → SEO kém

2. **Khó bảo trì và chỉnh sửa**
   - Code phức tạp, lồng nhiều bảng
   - Khó thay đổi layout so với dùng CSS (Flexbox, Grid)

3. **Hiệu suất kém**
   - Trình duyệt phải load và render toàn bộ bảng mới hiển thị
   - Gây chậm trang

4. **Không responsive tốt**
   - Khó hiển thị trên mobile
   - Không linh hoạt như CSS

## Phần B: Thực hành code
Câu B3:
Lỗi 1: Dòng 1 — `<!DOCTYPE>` sai cú pháp — Sửa thành `<!DOCTYPE html>`

Lỗi 2: Dòng 2 — Thiếu thuộc tính `lang` trong `<html>` — Sửa thành `<html lang="vi">`

Lỗi 3: Dòng 4 — Thẻ `<title>` không đóng — Thêm `</title>`

Lỗi 4: Dòng 5 — `charset="utf8"` sai chuẩn — Sửa thành `UTF-8`

Lỗi 5: Dòng 9 — Thẻ `<h1>` không đóng đúng — Sửa `</h1>`

Lỗi 6: Dòng 13 — Thẻ `<a>` không đóng — Thêm `</a>`

Lỗi 7: Dòng 19 — Thuộc tính `src` không có dấu ngoặc kép — Sửa thành `src="iphone.jpg"`

Lỗi 8: Dòng 21 — Thẻ `<b>` đóng sai vị trí — Sửa thành `<strong>...</strong>`

Lỗi 9: Dòng 27 — Bảng không dùng `<thead>` và `<tbody>` — Bổ sung cấu trúc bảng chuẩn

Lỗi 10: Dòng 35 — Dùng 2 thẻ `<main>` — Thay `<main>` thứ hai bằng `<aside>`

Lỗi 11: Dòng 39 — Thẻ `<p>` trong footer không đóng — Thêm `</p>`

Lỗi 12: Thiếu thuộc tính `alt` cho `<img>` — Thêm `alt="iPhone 16 Pro"`

Câu B4:
3 thẻ semantic HTML5 mà trang đó sử dụng

Thẻ:
![alt text](image.png)

Thẻ:
![alt text](image-1.png)

Thẻ:
![alt text](image-2.png)

Thẻ
cho tiêu đề bảng — Sửa: Thay bằng	nằm trong
![alt text](image-3.png)

Bảng đang hiển thị so sánh các phiên bản iPhone (Pro Max) theo 3 cột: Các phiên bản Giá bán thị trường quốc tế Giá bán tại Thế Giới Di Động
Có
và không có
![alt text](image-4.png)

## Phần C: Suy luận
Câu C1:
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Chi tiết sản phẩm</title>
</head>

<body>

<!-- Header: chứa logo + điều hướng chính -->
<header>
    <h1>ShopTLU</h1> <!-- h1: tiêu đề chính của toàn trang -->

    <nav> <!-- nav: khu vực điều hướng chính -->
        <a href="#">Trang chủ</a>
        <a href="#">Sản phẩm</a>
        <a href="#">Liên hệ</a>
    </nav>
</header>

<!-- Breadcrumb -->
<nav aria-label="breadcrumb"> <!-- nav: điều hướng -->
    <ol> <!-- ol: breadcrumb có thứ tự -->
        <li><a href="#">Trang chủ</a></li>
        <li><a href="#">Điện thoại</a></li>
        <li>iPhone 16</li> <!-- item cuối không cần link -->
    </ol>
</nav>

<!-- Nội dung chính -->
<main> <!-- main: nội dung chính của trang -->

    <!-- Khu vực sản phẩm -->
    <section> <!-- section: nhóm nội dung liên quan đến sản phẩm -->

        <!-- Ảnh sản phẩm -->
        <figure> <!-- figure: nhóm hình ảnh -->
            <img src="#" alt="Ảnh sản phẩm 1">
            <img src="#" alt="Ảnh sản phẩm 2">
            <img src="#" alt="Ảnh sản phẩm 3">
            <img src="#" alt="Ảnh sản phẩm 4">
            <img src="#" alt="Ảnh sản phẩm 5">
            <figcaption>Hình ảnh sản phẩm</figcaption> <!-- mô tả ảnh -->
        </figure>

        <!-- Thông tin sản phẩm -->
        <article> <!-- article: nội dung độc lập (sản phẩm) -->
            <h2>Tên sản phẩm</h2> <!-- tiêu đề sản phẩm -->
            <p>Giá: <strong>xx.xxx.xxxđ</strong></p> <!-- strong: nhấn mạnh giá -->
            <p>Đánh giá: ★★★★☆</p> <!-- thông tin đánh giá -->
            <p>Mô tả ngắn về sản phẩm...</p>
        </article>

    </section>

    <!-- Bảng thông số kỹ thuật -->
    <section> <!-- section: nhóm thông tin kỹ thuật -->
        <h2>Thông số kỹ thuật</h2>

        <table> <!-- table: dữ liệu dạng bảng -->
            <thead> <!-- tiêu đề bảng -->
                <tr>
                    <th>Thông số</th>
                    <th>Chi tiết</th>
                </tr>
            </thead>

            <tbody> <!-- nội dung chính -->
                <tr>
                    <td>CPU</td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>RAM</td>
                    <td>...</td>
                </tr>
            </tbody>
        </table>
    </section>

    <!-- Khu vực đánh giá -->
    <section> <!-- section: nhóm bình luận -->
        <h2>Đánh giá & Bình luận</h2>

        <article> <!-- mỗi bình luận là 1 article -->
            <p><strong>Người dùng A:</strong> Sản phẩm rất tốt!</p>
        </article>

        <article>
            <p><strong>Người dùng B:</strong> Đáng tiền.</p>
        </article>
    </section>

</main>

<!-- Sidebar -->
<aside> <!-- aside: nội dung phụ -->
    <h2>Sản phẩm tương tự</h2>

    <article> <!-- mỗi sản phẩm là 1 article -->
        <p>Sản phẩm 1</p>
    </article>

    <article>
        <p>Sản phẩm 2</p>
    </article>
</aside>

<!-- Footer -->
<footer> <!-- footer: thông tin cuối trang -->
    <p>© 2026 ShopTLU</p>
</footer>

</body>
</html>

Câu C2:
Quan điểm “dùng `<div>` cho mọi thứ rồi thêm class là đủ” có thể nhanh lúc đầu, nhưng về lâu dài gây nhiều vấn đề kỹ thuật.
Thứ nhất, về **SEO**: các công cụ tìm kiếm như Google dựa vào cấu trúc semantic để hiểu nội dung trang. Nếu mọi thứ đều là `<div>`, bot sẽ khó phân biệt đâu là header, nội dung chính hay bài viết. Việc sử dụng các thẻ như `<header>`, `<main>`, `<article>` giúp tăng khả năng index đúng nội dung và cải thiện thứ hạng tìm kiếm.
Thứ hai, về **Accessibility**: các công cụ hỗ trợ như screen reader dựa vào semantic HTML để đọc và điều hướng trang cho người khiếm thị. Ví dụ, khi dùng `<nav>`, người dùng có thể nhanh chóng chuyển đến khu vực điều hướng; còn nếu chỉ dùng `<div>`, họ sẽ phải đọc toàn bộ nội dung một cách khó khăn.
Một ví dụ cụ thể: khi xây dựng trang blog, nếu mỗi bài viết được đặt trong `<article>` và tiêu đề dùng `<h2>`, Google có thể hiểu rõ từng bài là một nội dung độc lập. Đồng thời, screen reader cũng cho phép người dùng nhảy qua từng article dễ dàng — điều mà `<div>` không hỗ trợ tốt.
Tuy nhiên, `<div>` vẫn có vai trò quan trọng. Trong các trường hợp layout hoặc grouping không mang ý nghĩa nội dung ví dụ: wrapper để chia layout bằng CSS Grid/Flexbox, việc dùng `<div>` là hoàn toàn hợp lý.
Tóm lại, semantic HTML không làm mất thời gian mà giúp code rõ ràng, dễ bảo trì, tốt cho SEO và thân thiện hơn với người dùng.

## Link video PBT01: 

(https://drive.google.com/file/d/1W7wZhyzsB_P86isERqRvtqO7NHK2ZptW/view?usp=sharing)s