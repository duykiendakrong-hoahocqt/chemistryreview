# HÓA HỌC THPT ĐAKRÔNG
> **Hệ thống ôn luyện & đánh giá năng lực Hóa học trực tuyến (Chương trình GDPT 2018 - Trường THPT Đakrông)**

---

## 📌 Giới thiệu dự án
Ứng dụng Web Single Page Application (SPA) hỗ trợ học sinh và giáo viên môn Hóa học THPT trường **THPT Đakrông**, được xây dựng bám sát định hướng của bộ sách **Kết Nối Tri Thức Với Cuộc Sống** và định dạng đề thi đánh giá năng lực mới nhất của Bộ Giáo dục & Đào tạo.

---

## 🚀 Các Tính Năng Chính

### 1. Phân hệ Học sinh (Tự học & Thi đánh giá)
- **Hệ thống hóa kiến thức 21 chương của cả 3 khối lớp 10, 11, 12**:
  - Tóm tắt cô đọng lý thuyết trọng tâm từ mục *"Em đã học"* và *"Ôn tập chương"*.
  - Sơ đồ tư duy dạng thẻ, công thức hóa học rõ ràng dạng subscript/superscript ($H_2O, SO_4^{2-}, \Delta_r H^\circ_{298}, 1s^22s^22p^6$).
- **Phòng thi trắc nghiệm 45 phút chuẩn cấu trúc 28 câu mới nhất của Bộ GD&ĐT**:
  - **Phần I**: 18 câu Trắc nghiệm 4 lựa chọn (A, B, C, D) - 0,25 đ/câu (Tổng 4,5 điểm).
  - **Phần II**: 4 câu Đúng / Sai gồm 16 ý (a, b, c, d) - 0,25 đ/ý (Tổng 4,0 điểm).
  - **Phần III**: 6 câu Trả lời ngắn - 0,25 đ/câu (Tổng 1,5 điểm).
  - Đồng hồ đếm ngược 45:00 tự động thu và chấm bài khi hết giờ.
- **Chấm điểm tức thì & Xem lại bài làm**:
  - Bảng tổng kết điểm (/10), số câu đúng từng phần, xếp loại năng lực.
  - Phân tích đáp án chi tiết (đúng màu xanh, sai màu đỏ, so sánh lựa chọn của thí sinh với đáp án chuẩn).
  - **Gia sư AI**: Giải thích chi tiết bước làm và bản chất hóa học cho từng câu hỏi.

### 2. Tiện ích tra cứu nổi (Floating Modals)
- **Bảng tuần hoàn các nguyên tố hóa học**: Tra cứu Z, nguyên tử khối, cấu hình electron, độ âm điện, phân loại nguyên tố.
- **Dãy điện hóa kim loại chuẩn**: Thế điện cực chuẩn $E^\circ$ (V), chiều biến thiên tính oxi hóa/khử, quy tắc Alpha ($\alpha$).
- **Bảng tính tan**: Tra cứu tính tan và màu sắc kết tủa đặc trưng của các muối và hydroxide trong nước.

### 3. Phân hệ Quản trị viên dành cho Giáo viên
- **Bảo mật**: Yêu cầu mật khẩu chính xác: `Kien123456@@`.
- **Thống kê & Sổ điểm**:
  - Danh sách bài nộp của học sinh (họ tên, lớp, khối, chương thi, điểm số, thời gian).
  - Thống kê tự động: Điểm trung bình, điểm cao nhất, tỷ lệ Đạt (≥ 5.0).
  - **Xuất bảng điểm ra file Excel/CSV** chuẩn Tiếng Việt (UTF-8 BOM không lỗi font).
- **Smart Parser (Nạp đề tự động)**:
  - Copy-paste nhanh đề thi từ Word/PDF.
  - Tự động nhận diện đáp án đúng qua thẻ `<u>...</u>` hoặc `_..._`.
- **Thêm câu hỏi thủ công**: Thêm câu hỏi trắc nghiệm 4 lựa chọn, Đúng/Sai, Trả lời ngắn vào ngân hàng đề của từng chương.

---

## 🛠️ Hướng Dẫn Cài Đặt & Chạy Trên GitHub

### 1. Yêu cầu môi trường
- [Node.js](https://nodejs.org/) (phiên bản 18 trở lên)
- Trình quản lý gói `npm` hoặc `yarn`

### 2. Cài đặt các gói phụ thuộc
```bash
# Clone repository từ GitHub
git clone https://github.com/duykiendak/hoa-hoc-thpt-dakrong.git

# Di chuyển vào thư mục dự án
cd hoa-hoc-thpt-dakrong

# Cài đặt dependencies
npm install
```

### 3. Chạy ở môi trường phát triển (Development)
```bash
npm run dev
```
Ứng dụng sẽ chạy tại địa chỉ: `http://localhost:3000`

### 4. Build sản phẩm đóng gói (Production)
```bash
npm run build
```
Thư mục `dist/` sẵn sàng triển khai lên GitHub Pages, Vercel, Netlify hoặc máy chủ web.

---

## 🔑 Tài Khoản Quản Trị
- **Mật khẩu Quản trị Giáo viên**: `Kien123456@@`

---

## 🏫 Bản Quyền
- **Trường THPT Đakrông - Tổ Hóa Học**
- Bản quyền © 2025 THPT Đakrông.
