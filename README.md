# VANATA Co.,Ltd Website

Website giới thiệu công ty VANATA chuyên về thiết kế kiến trúc, BIM modeling, CAD drawing và đào tạo.

## 🚀 Tính năng

- **Intro Animation**: Hiệu ứng intro động với chữ VANATA xuất hiện lần lượt
- **Hero Slider**: Slider tự động với hiệu ứng stripe reveal mượt mà
- **Responsive Design**: Tương thích đa nền tảng (desktop, tablet, mobile)
- **Contact Form**: Form liên hệ với PHPMailer
- **Multi-language**: Hỗ trợ tiếng Việt và tiếng Nhật

## 📁 Cấu trúc thư mục

```
vanata/
├── assets/
│   ├── css/
│   │   └── styles.css          # CSS chính với versioning
│   ├── js/
│   │   └── scripts.js          # JavaScript chính với versioning
│   └── imgs/                   # Hình ảnh
├── views/
│   ├── index.html              # Trang chủ
│   ├── company.html            # Giới thiệu công ty
│   ├── works.html              # Dự án
│   ├── training.html           # Đào tạo
│   ├── cost.html               # Chi phí
│   ├── contact.html            # Liên hệ
│   └── thankyou.html           # Cảm ơn
├── mail/
│   ├── sendmail.php            # Xử lý gửi email
│   └── PHPMailer/              # Thư viện PHPMailer
├── controllers/
├── models/
└── README.md

```

## 🛠️ Cài đặt

### Yêu cầu
- XAMPP hoặc bất kỳ web server nào hỗ trợ PHP
- PHP 7.0 trở lên
- PHPMailer đã được bao gồm trong project

### Các bước cài đặt

1. **Clone hoặc copy project vào thư mục htdocs**
   ```bash
   c:\xampp\htdocs\vanata\
   ```

2. **Khởi động XAMPP**
   - Mở XAMPP Control Panel
   - Start Apache server

3. **Truy cập website**
   ```
   http://localhost/vanata/views/index.html
   ```

## 🎨 Tùy chỉnh

### Chỉnh thời gian Intro
File: `assets/js/scripts.js`

```javascript
// Line 55: Thời gian đệm sau khi animation kết thúc (ms)
const buffer = 2180;
```

### Chỉnh tốc độ hiệu ứng chuyển cảnh
File: `assets/css/styles.css`

```css
/* Line 113: Tốc độ fade out intro */
transition: opacity 2s cubic-bezier(.77,0,.18,1);

/* Line 137: Tốc độ panel trượt */
transition: transform 2000ms ease-out;
```

### Chỉnh animation delay của từng chữ
File: `assets/css/styles.css`

```css
/* Line 164-169: Delay cho từng ký tự trong intro */
.mark.play .letter:nth-child(1){animation-delay:.35s}
.mark.play .letter:nth-child(2){animation-delay:.55s}
.mark.play .letter:nth-child(3){animation-delay:.75s}
.mark.play .letter:nth-child(4){animation-delay:.95s}
.mark.play .letter:nth-child(5){animation-delay:1.15s}
.mark.play .letter:nth-child(6){animation-delay:1.35s}
```

## 🔄 Cache Busting

Để tránh vấn đề cache CSS/JS khi cập nhật:

**Khi sửa CSS hoặc JS, tăng version trong các file HTML:**

```html
<!-- Từ -->
<link rel="stylesheet" href="./assets/css/styles.css?v=1.1">
<script src="./assets/js/scripts.js?v=1.1"></script>

<!-- Lên -->
<link rel="stylesheet" href="./assets/css/styles.css?v=1.2">
<script src="./assets/js/scripts.js?v=1.2"></script>
```

**Các file cần cập nhật version:**
- `views/index.html`
- `views/company.html`
- `views/works.html`
- `views/training.html`
- `views/cost.html`
- `views/contact.html`
- `views/thankyou.html`

## 📧 Cấu hình Email

File: `mail/sendmail.php`

Cần cấu hình SMTP settings:

```php
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'your-email@gmail.com';
$mail->Password = 'your-app-password';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
```

## 🎯 Các trang chính

| Trang | URL | Mô tả |
|-------|-----|-------|
| Home | `/views/index.html` | Trang chủ với intro animation |
| Company | `/views/company.html` | Giới thiệu công ty |
| Works | `/views/works.html` | Dự án: BIM, CAD, CG |
| Training | `/views/training.html` | Đào tạo |
| Cost | `/views/cost.html` | Bảng giá dịch vụ |
| Contact | `/views/contact.html` | Form liên hệ |
| Thank You | `/views/thankyou.html` | Trang cảm ơn |

## 🎬 Hiệu ứng đặc biệt

### Intro Animation
- Chữ VANATA xuất hiện lần lượt với staggered animation
- Tự động chuyển sang home sau khi animation kết thúc
- User có thể bỏ qua bằng click, scroll, hoặc phím (Enter/Space/ArrowDown)

### Hero Slider
- Auto-play với interval 5 giây
- Hiệu ứng stripe reveal 7 dải
- Smooth crossfade + scale + blur effect

### Header Theme Switch
- Header trong suốt khi ở hero section
- Chuyển sang nền trắng mờ khi scroll xuống

## 📱 Responsive Breakpoints

```css
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 900px)  { /* Small tablet */ }
@media (max-width: 840px)  { /* Mobile menu */ }
@media (max-width: 768px)  { /* Mobile */ }
@media (max-width: 640px)  { /* Small mobile */ }
@media (max-width: 600px)  { /* Extra small */ }
@media (max-width: 480px)  { /* Very small */ }
```

## 🌐 Font & Icons

**Fonts:**
- AI Bayan (cho intro và slider caption)
- Adobe Garamond Pro
- Noto Sans JP (cho nội dung tiếng Nhật)
- Montserrat (headings)

**Icons:**
- Google Material Symbols

## 📝 License

© 2026 VANATA Co.,Ltd. All rights reserved.

## 👨‍💻 Author

**Created by:** Nguyễn Lực  
**Date:** January 28, 2026  
**Role:** Web Developer & Designer

## 🔧 Developer Notes

**Version History:**
- `v1.1` - Cache busting implementation (January 2026)
- `v1.0` - Initial release (January 2026)

**Known Issues:**
- None

**Todo:**
- [ ] Add more project examples
- [ ] Implement dark mode
- [ ] Add language switcher
- [ ] Optimize images

---

**Developed by:** Nguyễn Lực | © 2026 VANATA Co.,Ltd
