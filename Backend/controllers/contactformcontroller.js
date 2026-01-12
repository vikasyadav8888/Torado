import transporter from "../config/mailer.js";
import contactModel from "../models/contactformmodel.js";

const contactController = {
  async create(req, res) {
    try {
      const { name, email, phone, subject, message } = req.body;

      if (!name || !email || !phone || !subject || !message) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      // 🔹 logged-in user id from token
      const created_by = req.user.id;

      await contactModel.create({
        name,
        email,
        phone,
        subject,
        message,
        created_by,
      });
      await transporter.sendMail({
        from: `"Contact Form" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `New Contact Message: ${subject}`,
        html: `
          <h3>New Contact Message</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Subject:</b> ${subject}</p>
          <p><b>Message:</b> ${message}</p>
          <p><b>User ID:</b> ${created_by}</p>
        `,
      });
      await transporter.sendMail({
        from: `"Support Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "We received your message",
        html: `
          <p>Hi <b>${name}</b>,</p>
          <p>Thank you for contacting us. We have received your message and our team will get back to you shortly.</p>

          <hr />

          <p><b>Your Message:</b></p>
          <p>${message}</p>

          <br />
          <p>Regards,</p>
          <p><b>Support Team</b></p>
        `,
      });

      res.status(201).json({
        message: "Message sent successfully",
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Failed to send message",
        error: error.message,
      });
    }
  },
  async getAll(req, res) {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({
          message: "Access denied. Admin only",
        });
      }

      const data = await contactModel.getAll();
      res.json(data);

    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch contacts",
        error: error.message,
      });
    }
  },
  async getById(req, res) {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({
          message: "Access denied. Admin only",
        });
      }

      const { id } = req.params;
      const data = await contactModel.getById(id);

      if (!data) {
        return res.status(404).json({
          message: "Contact not found",
        });
      }

      res.json(data);

    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch contact",
        error: error.message,
      });
    }
  },
  async hardDelete(req, res) {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({
          message: "Access denied. Admin only",
        });
      }

      const { id } = req.params;
      await contactModel.hardDelete(id);

      res.json({
        message: "Contact deleted permanently",
      });

    } catch (error) {
      res.status(500).json({
        message: "Failed to delete contact",
        error: error.message,
      });
    }
  },
};

export default contactController;
