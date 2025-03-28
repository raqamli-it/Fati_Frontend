import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import style from "./employees.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";

function EmployeesDetail() {
  const { detail } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [dataDetail, setDataDetail] = useState([]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`/markazlar-bolimlar/Xodimlar/${detail}`)
      .then((response) => setDataDetail(response.data)) // ✅ To‘g‘ri versiya
      .catch((error) => console.error("Xatolik:", error));
  }, [detail]);

  console.log(dataDetail, "detail xxx");

  return (
    <div className={style.container}>
      <button
        title="Sahifadan chiqish"
        className={style["back-button"]}
        onClick={() => navigate(-1)}
      >
        <FaArrowLeftLong fontSize={"22px"} />
        Sahifadan chiqish
      </button>

      <div className={style.cardDetails}>
        <div className={style.imgDetail}>
          <img src={dataDetail.image} alt={dataDetail?.[`ful_name_${lang}`]} />
          <h1>{dataDetail?.[`full_name_${lang}`]}</h1>

          <div className={style["user-details"]}>
            <span>Lavozimi : </span>
            <span>{dataDetail?.[`position_${lang}`]}</span>
          </div>

          <div className={style["user-details"]}>
            <span>Unvoni : </span>
            <span>{dataDetail?.[`degree_${lang}`]}</span>
          </div>

          <div className={style["user-details"]}>
            <span>Raqami : </span>
            <span>{dataDetail?.phone}</span>
          </div>

          <div className={style["user-details"]}>
            <span>Emaili : </span>
            <span>{dataDetail?.email}</span>
          </div>
        </div>

        <div className={style.cardDetail}>
          <div
            dangerouslySetInnerHTML={{ __html: dataDetail?.[`about_${lang}`] }}
          ></div>
        </div>
      </div>

      <div className={style.lineX}></div>

      <div className={style.acardion}>
        <button onClick={() => setIsOpen(!isOpen)} className={style.toggleBtn}>
          <span>Asarlari va maqolalari</span>
          <FaChevronDown
            className={isOpen ? style.rotateIconY : style.rotateIcon}
          />
        </button>

        <div
          style={{ fontSize: "18px", lineHeight: "32px" }}
          className={`${style.closeText} ${isOpen ? style.openText : ""}`}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          sint minus nam a excepturi inventore non aliquam quae! Dolor odio
          voluptate molestias, voluptates tempora laborum dolores consequuntur
          aut facilis quasi magni culpa eum saepe provident ratione nihil neque!
          Ratione culpa aliquid nam iusto, molestiae assumenda nihil reiciendis
          magnam quaerat ducimus natus consequatur nesciunt fuga eveniet sint id
          delectus odit, at quos molestias rem? Distinctio fugiat beatae est sed
          laboriosam, voluptates minima illum, nulla iure repudiandae dolor
          perspiciatis maiores? Quo eius voluptatibus quae debitis quidem
          repudiandae aliquam alias accusamus soluta, quos optio deleniti
          reiciendis officiis. Aut repellendus quas facilis. Inventore atque,
          incidunt, quibusdam molestias laudantium at laborum tenetur officia
          qui deleniti, tempora accusantium! Eaque voluptate illum earum rerum
          dolor ipsam soluta eos assumenda, veniam molestias voluptatibus illo
          ea impedit perspiciatis cum doloremque similique labore et numquam eum
          consequatur? Quae voluptate, natus maiores molestias quod esse
          consequuntur error quam repudiandae quaerat deleniti tempore numquam
          porro, voluptas, ad saepe impedit iusto! Magnam ipsum, officiis dolor
          quas ullam eaque totam atque nemo qui voluptatibus laborum accusamus
          animi quis odit rerum vitae quos cumque deserunt vel unde libero saepe
          quibusdam nesciunt placeat? Tenetur nostrum deleniti, magni nemo
          possimus commodi esse deserunt aperiam inventore asperiores excepturi
          perferendis alias aspernatur autem harum quam facilis enim accusantium
          libero recusandae! Adipisci, cumque perferendis neque odio ut impedit
          quia aut eos ipsam perspiciatis placeat quas officia beatae, dolorem
          minus aliquid fugit deserunt distinctio corrupti officiis tenetur.
          Illo velit, et quasi minus dolores voluptatibus error. Id perferendis
          ut aliquam, animi eos iusto asperiores repellendus molestiae ab,
          praesentium ratione inventore quos provident soluta quae neque
          obcaecati. Necessitatibus cum rerum facilis dolorem doloremque itaque
          totam quos, deleniti molestiae assumenda tenetur. Tenetur itaque,
          voluptas laudantium laborum at explicabo blanditiis quae dolore error
          aliquid saepe ea atque dolor! Aperiam laudantium in recusandae ducimus
          vel harum rem doloremque. Molestiae dolorem ea at recusandae expedita,
          reiciendis illo, tenetur nisi veritatis explicabo dignissimos, modi
          voluptate earum repellat voluptas deleniti eveniet officia aut facere
          ipsam consequuntur rerum libero quia! Commodi nam nobis modi minus
          nemo veritatis? Mollitia porro minus aspernatur fugit qui, fuga quia
          beatae aperiam earum ratione sapiente eum labore dolore accusamus ut
          provident veniam deserunt saepe iure tempora. Qui quas perferendis
          error asperiores. Sit, voluptatibus minima? Repellat accusantium
          blanditiis magni facilis ullam atque, asperiores quo itaque molestiae
          cumque suscipit eaque magnam aperiam voluptatibus expedita. Illo sequi
          dicta magni deserunt sed! Alias, nostrum dolorum ex cumque ut velit.
        </div>
      </div>
    </div>
  );
}

export default EmployeesDetail;
