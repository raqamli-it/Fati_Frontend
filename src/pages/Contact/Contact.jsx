import { useTranslation } from "react-i18next";
import styles from "./contact.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Contact = ({ setLoading, loading }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "/qoshimcha-malumotlar/xabarlar/",
        {
          name: name,
          phone: phone,
          content: content,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        console.log("Javob:", response);
        toast.success("Xabar muvaffaqiyatli jo‘natildi!");
        setName("");
        setPhone("");
        setContent("");
      }
    } catch (error) {
      toast.error("Xabar jo‘natishda xatolik yuz berdi!");
      console.error("Xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      await axios
        .get("/qoshimcha-malumotlar/aloqa/")
        .then((req) => setData(req.data));
    } catch (error) {
      console.error("Ma'lumotni olishda xatolik:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading === "show-p") {
    return <p className="show-p-error">{t("show-p-error")}</p>;
  }
  if (loading === true) {
    return <div className="loader"></div>;
  }

  return (
    <section className={styles.section}>
      <h1>Biz bilan bog'laning</h1>
      <div>
        {data?.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.box}>
              <h3>Telefon:</h3>
              <p>{item.phone}</p>
            </div>

            <div className={styles.box}>
              <h3>Email:</h3>
              <p>{item.email}</p>
            </div>

            <div className={styles.box}>
              <h3>Manzil:</h3>
              <p>{item.adress}</p>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Bizga xabar yuboring</h2>
          <div className={styles.sendMessage}>
            <div className={styles.inputValue}>
              <label htmlFor="ism">Isim</label>
              <input
                required
                onChange={(e) => setName(e.target.value)}
                id="ism"
                type="text"
                placeholder="Ismingizni kiriting"
              />
            </div>

            <div className={styles.inputValue}>
              <label htmlFor="phone">Telefon Raqam</label>
              <input
                required
                onChange={(e) => setPhone(e.target.value)}
                id="phone"
                type="text"
                placeholder="Telefon raqamingizni kiriting"
              />
            </div>
          </div>

          <textarea
            onChange={(e) => setContent(e.target.value)}
            rows="8"
            name=""
            id=""
            placeholder="Xabaringizni yuboring"
          ></textarea>
          <button type="submit" className={styles.send}>
            Yuborish
          </button>
        </form>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11988.423207249718!2d69.2865385!3d41.3065619!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8ad515a743d3%3A0x39f0e8ce7ec381ea!2sO&#39;zbekiston%20Respublikasi%20Fanlar%20akademiyasi!5e0!3m2!1suz!2s!4v1730127802141!5m2!1suz!2s"
          style={{
            width: "100%",
            height: "450px",
            border: 0,
            display: "block",
            margin: "0 auto",
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
};
