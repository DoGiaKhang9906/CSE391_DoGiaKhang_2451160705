## Phần A: Đọc hiểu

Câu A1:
1. type="email" → Ô nhập text, trình duyệt tự kiểm tra có chứa @ và định dạng email hợp lệ → Dùng cho form đăng ký / đăng nhập tài khoản
2. type="password" → Ô nhập text nhưng ký tự bị ẩn (hiện dấu ●●●) → Dùng cho nhập mật khẩu khi đăng nhập
3. type="text" → Ô nhập văn bản thông thường → Dùng nhập tên khách hàng, địa chỉ, tên sản phẩm
4. type="number" → Ô nhập số, có nút tăng/giảm → Chỉ cho nhập số → Dùng nhập số lượng sản phẩm
5. type="tel" → Ô nhập số điện thoại → Có thể hiện bàn phím số trên mobile → Dùng nhập số điện thoại khách hàng
6. type="url" → Ô nhập link → Tự kiểm tra định dạng URL (có http/https) → Dùng nhập link website (ví dụ shop hoặc hồ sơ)
7. type="date" → Hiển thị bộ chọn ngày (calendar) → Chỉ cho chọn ngày hợp lệ → Dùng chọn ngày sinh, ngày giao hàng
8. type="radio" → Nút chọn 1 trong nhiều lựa chọn → Chỉ chọn được 1 option → Dùng chọn giới tính, phương thức thanh toán
9. type="checkbox" → Ô tick chọn nhiều lựa chọn → Có thể chọn nhiều option → Dùng chọn sản phẩm thêm, điều khoản đồng ý
10. type="file" → Cho phép upload file → Có thể giới hạn loại file → Dùng upload ảnh sản phẩm / ảnh đại diện

Câu A2:

TH1: Form không submit, trình duyệt báo : “Please fill out this field”. Vì required bắt buộc phải nhập và value="" đang rỗng → không hợp lệ.

TH2: Form không submit, báo lỗi: “Please include an '@' in the email address”. Vì type="email" yêu cầu đúng định dạng email và "abc" không có @ → sai format.

TH3: Form không submit, báo lỗi: “Value must be less than or equal to 10”. Vì giá trị phải nằm trong [1, 10] và 15 > 10 → vi phạm max.

TH4: Form không submit, báo lỗi: “Please match the requested format”. Vì pattern="[0-9]{10}" → phải đúng 10 chữ số và "abc123": có chữ cái, không đủ 10 số. 

TH5: Form không submit, báo lỗi: “Please lengthen this text to 8 characters or more”. Vì minlength="8" yêu cầu ≥ 8 ký tự và "123" chỉ có 3 ký tự → không hợp lệ.

Câu A3:
1. Tại sao `<label for="email">` quan trọng cho screen reader?

Thẻ `<label>` được dùng để mô tả cho một ô nhập liệu (`input`). Khi sử dụng thuộc tính `for`, nó sẽ liên kết trực tiếp với `input` có cùng `id`.
- Khi người dùng sử dụng screen reader (phần mềm đọc màn hình), khi họ di chuyển đến ô input, screen reader sẽ đọc nội dung của label trước.
- Ví dụ nó sẽ đọc: "Email, edit text" → giúp người dùng hiểu đây là ô nhập email.

2. Khi nào dùng `<fieldset>` + `<legend>`?

Thẻ `<fieldset>` được dùng để nhóm nhiều input có liên quan với nhau, còn `<legend> là tiêu đề của nhóm đó.

Dùng khi: 
- Khi form có nhiều câu hỏi hoặc nhiều lựa chọn cùng một chủ đề
- Ví dụ: giới tính, phương thức thanh toán, thông tin cá nhân

Ví dụ:
```html
<fieldset>
  <legend>Phương thức thanh toán</legend>
  <input type="radio" id="cod" name="payment" value="cod" />
  <label for="cod">COD</label>
  <input type="radio" id="card" name="payment" value="card" />
  <label for="card">Thẻ ngân hàng</label>
  <input type="radio" id="momo" name="payment" value="momo" />
  <label for="momo">Ví MoMo</label>
</fieldset>
```

3. aria-label dùng khi nào? Tại sao KHÔNG nên dùng aria-label khi đã có `<label`>?
`aria-label` dùng khi nào? Tại sao không dùng khi đã có `<label>`?

- `aria-label` dùng khi không thể thêm `<label>` vào HTML, ví dụ nút icon không có chữ, ô tìm kiếm trên header không có label hiển thị.
- Không nên dùng `aria-label` khi đã có `<label>` vì 2 cái sẽ xung đột, `aria-label` sẽ ghi đè `<label>` khiến screen reader bỏ qua label thật.
- `<label>` vừa hỗ trợ screen reader, vừa hiển thị được trên trang, vừa cho phép click vào chữ để focus input → tốt hơn `aria-label` toàn diện hơn.

Câu A4:
1. Thuộc tính loading="lazy" trên `<img>`
###  Cách hoạt động:
- Khi trang web load:
  - Ảnh trong vùng nhìn thấy → tải ngay  
  - Ảnh ở phía dưới (chưa cuộn tới) → chưa tải  
- Khi người dùng scroll xuống → ảnh mới bắt đầu load  

### Lợi ích:
- Giảm thời gian load trang ban đầu  
- Tiết kiệm băng thông chỉ tải ảnh cần thiết
- Cải thiện hiệu năng, đặc biệt trên mobile  
- Tăng điểm SEO 

### Khi KHÔNG nên dùng:
- Ảnh ở phần đầu trang
- Ảnh quan trọng cần hiển thị ngay lập tức  
- Ảnh logo, ảnh chính của sản phẩm  

-> Vì nếu dùng lazy loading ở các vị trí này → ảnh có thể load chậm, gây trải nghiệm kém  

2. Tại sao nên cung cấp nhiều `<source>` trong `<video>`
### Lý do:
- Các trình duyệt khác nhau hỗ trợ các định dạng video khác nhau  
- Nếu chỉ dùng 1 định dạng → có thể không chạy trên một số trình duyệt  

### Cách hoạt động:
Trình duyệt sẽ:
1. Đọc các `<source>` theo thứ tự  
2. Chọn định dạng mà nó hỗ trợ  
3. Bỏ qua các định dạng không tương thích  

### Ví dụ:

```html
<video controls>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <source src="video.ogv" type="video/ogg">
</video>
```

3. Thuộc tính alt trên `<img>`
- Cung cấp mô tả cho ảnh khi ảnh không tải được.
- Giúp screen reader đọc nội dung ảnh cho người khiếm thị.
- Hỗ trợ SEO (Google hiểu nội dung ảnh).

- Ảnh sản phẩm iPhone 16:  alt="iPhone 16 Pro Max màu Titan, mặt lưng và camera".
- Ảnh trang trí (decorative): alt = "" vì ảnh không mang nội dung quan trọng và giúp screen reader bỏ qua.
- Ảnh biểu đồ doanh thu Q1/2026: alt = "Biểu đồ doanh thu quý 1 năm 2026, tăng trưởng 20% so với quý trước".

Câu A5:
Cách 1 — `<img>`
Dùng khi:
- Ảnh chỉ mang tính minh họa đơn giản
- Không cần chú thích (caption) đi kèm
- Nội dung đã được mô tả rõ trong văn bản xung quanh
Ví dụ 1:
Ảnh icon trong thanh menu:

```<img src="cart-icon.png" alt="Giỏ hàng">```

Ví dụ 2:
Ảnh minh họa trong bài viết:

```<p>Sản phẩm mới ra mắt:</p>```
```<img src="iphone.jpg" alt="iPhone 16">```

Cách 2 — `<figure>` + `<figcaption>`
Dùng khi:
- Ảnh là nội dung chính, quan trọng
- Cần có chú thích (caption) đi kèm
- Muốn nhóm ảnh + mô tả thành một khối semantic rõ ràng
Ví dụ 1:
Trang sản phẩm E-Commerce:

```<figure>```
    ```<img src="iphone.jpg" alt="iPhone 16 Pro Max màu Titan">```
    ```<figcaption>iPhone 16 Pro Max — Giá: 25.990.000đ</figcaption>```
```</figure>```

Ví dụ 2:
Ảnh trong bài blog / báo:

```<figure>```
    ```<img src="chart.png" alt="Biểu đồ doanh thu 2026">```
    ```<figcaption>Doanh thu quý 1 năm 2026 tăng 20%</figcaption>```
```</figure>```

## Phần C: Phân tích và suy luận
Câu C1:

 Lỗi 1:
Dòng 2 — Input "Tên" không có `<label for="...">`, vi phạm accessibility  
 Sửa:
```html
<label for="name">Tên:</label>
<input type="text" id="name" name="name" required>
```

Lỗi 2:
Dòng 4 — Input email không có `<label> `
Sửa:
```html
<label for="email">Email:</label>
<input type="email" id="email" name="email" placeholder="Email của bạn" required>
```

Lỗi 3:
Dòng 6 — Input password không có `<label>`
Sửa:
```html
<label for="password">Mật khẩu:</label>
<input type="password" id="password" name="password" placeholder="Mật khẩu" required minlength="8">
```

Lỗi 4:
Dòng 7 — Input confirm password không có `<label>` và không có validation
Sửa:
```html
<label for="confirm">Nhập lại mật khẩu:</label>
<input type="password" id="confirm" name="confirm" placeholder="Nhập lại mật khẩu" required minlength="8">
```

Lỗi 5:
Dòng 9 — Phone dùng type="text" thay vì type="tel"
Sửa:
```html
<label for="phone">Số điện thoại:</label>
<input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required>
```

Lỗi 6:
Dòng 9 — Phone dùng value thay vì placeholder (không đúng UX)
Sửa:
```html
<input type="tel" id="phone" name="phone" placeholder="0901234567" pattern="[0-9]{10}" required>
```

Lỗi 7:
Dòng 11 — `<select>` không có `<label>`
Sửa:
```html
<label for="city">Thành phố:</label>
<select id="city" name="city" required>
    <option value="">-- Chọn thành phố --</option>
    <option>Hà Nội</option>
    <option>TP.HCM</option>
</select>
```

Lỗi 8:
Dòng 15 — Checkbox không có `<input>` (chỉ có label)
Sửa:
```html
<input type="checkbox" id="terms" required>
<label for="terms">Tôi đồng ý điều khoản</label>
```

Câu C2:
 1. Pattern regex cho CMND/CCCD và Số tài khoản

 - CMND/CCCD (đúng 12 chữ số):
```html
<input type="text" pattern="[0-9]{12}" required>
```

- Số tài khoản (10–15 chữ số): 
```html
<input type="text" pattern="[0-9]{10,15}" required>
```

2. HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa?

Chưa đủ an toàn. Vì:

- HTML5 validation chỉ chạy ở phía frontend (trình duyệt)
- Người dùng có thể:
    Tắt validation (DevTools),
    Gửi request trực tiếp (Postman, API),
    Sửa code HTML.

 Nghĩa là: có thể bypass hoàn toàn validation

- HTML5 validation chỉ nên dùng để:

    Cải thiện UX (trải nghiệm người dùng),
    Giảm lỗi nhập liệu

 Nhưng KHÔNG được dùng để bảo mật

 3. 3 loại validation HTML5 KHÔNG THỂ làm được
 - So sánh giữa các input

Ví dụ:

Password = Confirm password

 HTML không thể so sánh 2 giá trị → cần JavaScript

 - Kiểm tra logic phức tạp

Ví dụ:

Ngày sinh phải > 18 tuổi
Kiểm tra số CCCD hợp lệ theo thuật toán

 HTML không xử lý logic

 -  Kiểm tra dữ liệu từ server

Ví dụ:

Email đã tồn tại chưa
Username có bị trùng không

 HTML không gọi được database

 4. 2 rủi ro bảo mật nếu chỉ validate Frontend, không validate Backend

Rủi ro 1: Bypass validation
    - Hacker có thể gửi dữ liệu sai hoặc độc hại
    
    - Ví dụ: gửi số tài khoản sai định dạng

Rủi ro 2: Injection attack
    - Có thể chèn mã độc (SQL Injection, XSS)
    - Nếu backend không kiểm tra → hệ thống bị tấn công.

Link video PBT_02: https://drive.google.com/file/d/1kLEfX9Q2MVIEuQ10PxLos9MCFT5VaxE4/view?usp=sharing