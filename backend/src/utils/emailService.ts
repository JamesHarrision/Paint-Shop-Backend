import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

export const sendResetPasswordEmail = async (
  to: string,
  resetToken: string
) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  const mailOptions = {
    from: `"Paint Shop" <${process.env.MAIL_USER}>`,
    to,
    subject: 'Yêu cầu đặt lại mật khẩu - Paint Shop',
    html: `
      <h2>Xin chào!</h2>
      <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
      <p>Vui lòng click vào link bên dưới để đặt lại mật khẩu. Link này chỉ có hiệu lực trong 15 phút:</p>
      <a href="${resetLink}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Đặt lại mật khẩu</a>
      <p>Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}