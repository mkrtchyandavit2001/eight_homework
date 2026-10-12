import React from "react";
import "./SaleTicketPage.css";
import { useTranslation } from "react-i18next";

function SaleTicketPage() {
  const { t, i18n } = useTranslation();
  const bottomBlock = t("sale_ticket_page_botom_block", {
    returnObjects: true,
  });

  return (
    <div className="sale_ticket_page">
      <div className="container">
        <div className="sale_ticket_page_block">
          <div className="sale_ticket_page_block_title">
            <div className="lines_div_sale_ticket">
              <img src={require("../../images/Line 106.png")} alt="" />
              <h2>{t("sale_ticket_page_title")}</h2>
              <img src={require("../../images/Line 106.png")} alt="" />
            </div>
          </div>

          <div className="sale_ticket_page_block_info">
            <div className="sale_ticket_page_block_info_left">
              <p className="sale_ticket_page_block_info_left_title">
                {t("sale_ticket_page_block_titles.0")}
              </p>
              <div>
                <p>{t("sale_ticket_page_Text_part_1.0")}</p>
                <p>{t("sale_ticket_page_Text_part_1.1")}</p>
                <p>{t("sale_ticket_page_Text_part_1.2")}</p>
                <p>{t("sale_ticket_page_Text_part_1.3")}</p>
                <p>{t("sale_ticket_page_Text_part_1.4")}</p>
                <p>{t("sale_ticket_page_Text_part_1.5")}</p>
                <p>{t("sale_ticket_page_Text_part_1.6")}</p>
                <p>{t("sale_ticket_page_Text_part_1.7")}</p>
                <p>{t("sale_ticket_page_Text_part_1.8")}</p>
                <p>{t("sale_ticket_page_Text_part_1.9")}</p>
                <p>{t("sale_ticket_page_Text_part_1.10")}</p>
                <p>{t("sale_ticket_page_Text_part_1.11")}</p>
                <p>{t("sale_ticket_page_Text_part_1.12")}</p>
              </div>

              <img
                className="sale_line_1"
                src={require("../../images/line_right.png")}
                alt="line"
              />
            </div>

            <div className="sale_ticket_page_block_info_right">
              <div className="sale_ticket_page_block_info_right_img_div">
                <img src={require("../../images/ticket.png")} alt="" />
              </div>

              <div className="sale_ticket_page_block_info_right_text_div">
                <p className="sale_ticket_page_block_info_left_title">
                  {t("sale_ticket_page_block_titles.1")}
                </p>
                <div>
                  <p>{t("sale_ticket_page_Text_part_2.0")}</p>
                  <p>{t("sale_ticket_page_Text_part_2.1")}</p>
                  <p>{t("sale_ticket_page_Text_part_2.2")}</p>
                </div>

                <img
                  className="sale_line_2"
                  src={require("../../images/line_left.png")}
                  alt="line"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="sale_ticket_page_block">
          <div className="sale_ticket_page_block_title">
            <div className="lines_div_sale_ticket">
              <img src={require("../../images/Line 106.png")} alt="" />
              <h2>{bottomBlock.title}</h2>
              <img src={require("../../images/Line 106.png")} alt="" />
            </div>
          </div>

          <div className="sale_ticket_page_block_info">
            <div className="sale_ticket_page_block_info_left">
              <p className="sale_ticket_page_block_info_left_title">
                {bottomBlock.part_1.title}
              </p>
              <p>{bottomBlock.part_1.subTitle}</p>
              <ul>
                {bottomBlock.part_1.list.map((item, index) => (
                  <li key={index}>
                    <p>{item.title}</p>
                    {item.items && <ol className="sale_ticket_page_block_info_left_list">
                      {item.items.map((el, i) => <li key={i}>{el}</li>)}
                    </ol>}
                  </li>
                ))}
              </ul>
                <p>{bottomBlock.part_1.botomText}</p>
              <img
                className="sale_line_1"
                src={require("../../images/line_right.png")}
                alt="line"
              />
            </div>

            <div className="sale_ticket_page_block_info_right">
              <div className="sale_ticket_page_block_info_right_img_div">
                <img src={require("../../images/ticket.png")} alt="" />
              </div>

              <div className="sale_ticket_page_block_info_right_text_div">
                <p className="sale_ticket_page_block_info_left_title">
                  {bottomBlock.part_2.title}
                </p>
                <ul>
                  {bottomBlock.part_2.list.map((item, index) => (
                    <li key={index}>
                      <p>{item.title}</p>
                      {item.items && <ol className="sale_ticket_page_block_info_left_list">
                        {item.items.map((el, i) => <li key={i}>{el}</li>)}
                      </ol>}
                    </li>
                  ))}
                </ul>

                <img
                  className="sale_line_2"
                  src={require("../../images/line_left.png")}
                  alt="line"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaleTicketPage;
