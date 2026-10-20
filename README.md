# Gửi em — 20/10

Website tĩnh; chỉnh nội dung trực tiếp trong `dist/index.html`.

## Chạy bằng Live Server

1. Mở thư mục `20-10-web` hoặc `loi-chuc-20-10` trong VS Code.
2. Nếu Live Server đang chạy, bấm **Stop Live Server** rồi **Go Live** để nhận cấu hình mới.
3. Trên máy tính, mở `http://127.0.0.1:5500/`.
4. Trên iPhone cùng Wi-Fi, mở địa chỉ IP nội bộ của máy tính với cổng `5500`, ví dụ `http://192.168.1.10:5500/`. Thay IP ví dụ bằng IP thật của máy tính. Địa chỉ `127.0.0.1` trên iPhone không trỏ đến máy tính.

Hai cấu hình `.vscode/settings.json` đặt `dist` làm thư mục gốc của Live Server, tương ứng với thư mục mở trong VS Code.

## Đường dẫn

| URL | Tệp/thư mục local |
| --- | --- |
| `/` | `dist/index.html` |
| `/styles.css` | `dist/styles.css` |
| `/photos.css` | `dist/photos.css` |
| `/script.js` | `dist/script.js` |
| `/images/…` | Ảnh cá nhân trong `dist/images/` |
| `/assets/…` | Ảnh trang trí trong `dist/assets/` |

Các liên kết trong trang vẫn dùng đường dẫn tương đối để CSS, JavaScript và ảnh hoạt động ở cả local lẫn hosting.
