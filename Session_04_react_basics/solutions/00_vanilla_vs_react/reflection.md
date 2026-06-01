# Câu 1: Ở Phần A, mỗi lần thêm/xóa/toggle 1 todo, phải gọi bao nhiêu hàm?

- Thêm: `addTodo()` → `renderTodos()`
- Toggle: `toggleTodo()` → `renderTodos()`
- Xóa: `deleteTodo()` → `renderTodos()`

Mỗi thao tác đều phải gọi 2 hàm, và `renderTodos()` luôn vẽ lại toàn bộ danh sách dù chỉ thay đổi 1 item.

## Câu 2: Ở Phần B, khi `setTodos(...)` chạy, React tự động làm gì?

React tự động so sánh Virtual DOM cũ và mới, rồi chỉ cập nhật đúng phần thay đổi trên DOM thật. Không cần gọi render thủ công.

## Câu 3: Nếu Portfolio có 50 project, cách nào quản lý an toàn hơn?

React an toàn hơn vì state là single source of truth — UI luôn phản ánh đúng state. Vanilla JS dễ bị lỗi nếu quên gọi `renderTodos()` sau khi thay đổi data.

## Câu 4: useState + .map() + .filter() áp dụng cho Portfolio như thế nào?

- `useState` lưu danh sách projects
- `.map()` render từng `ProjectCard`
- `.filter()` lọc theo category (Web, Mobile, Design)

Giống hệt Todo — chỉ thay `TodoItem` bằng `ProjectCard`.