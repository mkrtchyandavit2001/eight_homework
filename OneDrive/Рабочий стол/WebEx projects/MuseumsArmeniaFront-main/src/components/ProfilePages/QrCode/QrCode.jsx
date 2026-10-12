import React, { useEffect, useRef, useState } from "react";
import "./QrCode.css";
import printer from "../../../images/Printer.png";
import download from "../../../images/download.svg";
import sendEmail from "../../../images/sendEmail.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getQr,
  postQrItem,
} from "../../../store/slices/ProfilePageSlice/ProfilePageApi";
import {
  selectQrData,
  selectQrResult,
} from "../../../store/slices/ProfilePageSlice/ProfilePageSlice";
import { LocationIcon, setingIcon } from "../../../iconFolder/icon";
import { useTranslation } from "react-i18next";
import { downloadImage } from "../../../helper/ProfileSidebarHelp/ProfileSidebarHelp";
import OutSideErrorModal from "../../OutSideErrorModal/OutSideErrorModal";

// Լոկալ թեստի համար true, live-ից առաջ՝ false
// const USE_MOCK = true;

// museum_name զանգվածի կարգը՝ [hy, ru, en]
const LANG_INDEX = { am: 0, ru: 1, en: 2 };

// const MOCK_QR = {
//   data: [
//     {
//       id: 484709661,
//       color: "#f2f2f2",
//       path: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=484709661",
//       path_base64: "",
//       museum_name: [
//         "Ավ. Իսահակյանի տուն-թանգարան",
//         "Дом-музей Аветика Исаакяна",
//         "House-museum of Avetik Isahakyan",
//       ],
//       museum_address: ["Զարոբյան 20", "Заробяна, 20", "Zarobyan str. 20"],
//       type: "special",
//       price: 5,
//       standard_price: 10,
//       intervals: [
//         { weekday: 1, start_time: "12:00", end_time: "14:00" },
//         { weekday: 1, start_time: "16:00", end_time: "17:00" },
//         { weekday: 4, start_time: "11:00", end_time: "13:00" },
//       ],
//     },
//   ],
// };

function QrCode() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const qrDataFromStore = useSelector(selectQrData);
  const respQrData = useSelector(selectQrData);
  // const respQrData = USE_MOCK ? MOCK_QR : qrDataFromStore;
  const respQrResult = useSelector(selectQrResult);
  const [modalOpen, setModalOpen] = useState(false);
  const [qrMessage, setQrMessage] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    dispatch(getQr());
  }, []);

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [modalOpen]);

  const openModal = (event, qrId) => {
    event.preventDefault();
    setModalOpen(qrId);
  };

  const ticketsType_for_private = t("ticketsType_for_private", {
    returnObjects: true,
  });
  const weekDaysList = t("weekDaysList", { returnObjects: true }); // 0 = Կիրակի ... 6 = Շաբաթ
  const currency = t("single_shop_page.0");

  const getTicketTypeLabel = (type) => {
    if (!Array.isArray(ticketsType_for_private)) return null;
    const key = type === "event-config" ? "event_config" : type;
    const found = ticketsType_for_private.find(
      (ticket) => Object.keys(ticket)[0] === key,
    );
    return found ? Object.values(found)[0] : null;
  };

  // Թանգարանի անունը՝ կայքի լեզվով
  const getLocalized = (value) => {
    if (!value) return "";
    if (Array.isArray(value)) {
      return value[LANG_INDEX[i18n.language]] || value.find(Boolean) || "";
    }
    if (typeof value === "object") {
      return value[i18n.language] || Object.values(value).find(Boolean) || "";
    }
    return value;
  };

  useEffect(() => {
    dispatch(getQr());
  }, [i18n.language]);

  // Backend-ում weekday՝ 1 = Երկուշաբթի ... 7 = Կիրակի, իսկ weekDaysList-ում 0 = Կիրակի
  const getWeekDay = (weekday) =>
    Array.isArray(weekDaysList) ? weekDaysList[weekday % 7] : weekday;

  useEffect(() => {
    if (respQrResult.success) {
      setQrMessage(true);
      setTimeout(() => setQrMessage(false), 4000);
    }
  }, [respQrResult]);

  return (
    <div className="QrCode_all">
      <div className="container">
        <p className="QrCode_title">
          QR code<span style={{ color: "#B26705" }}>(active)</span>{" "}
          <img
            style={{ cursor: "pointer" }}
            src={printer}
            alt="printer"
            onClick={() => window.print()}
          />
        </p>
        <div className="qr_code_items">
          {respQrData?.data &&
            respQrData.data.map((qrItem) => {
              const typeLabel = getTicketTypeLabel(qrItem.type);

              return (
                <div key={qrItem.id} className="qr_code_item">
                  <div className="qr_code_item_info_div">
                    {/* 1. Թանգարանի անուն */}
                    <p className="qr_code_item_info_div_name_museum">
                      {getLocalized(qrItem.museum_name)}
                    </p>

                    {/* 2. Հասցե */}
                    {qrItem.museum_address && (
                      <div className="qr_code_item_info_div_addres_div">
                        <LocationIcon width={12} height={12} fill="#575757" />
                        <span className="qr_code_item_info_div_addres">
                          {getLocalized(qrItem.museum_address)}
                        </span>
                      </div>
                    )}

                    {/* 3. Տոմսի տեսակ */}
                    {typeLabel && (
                      <p className="qr_code_item_info_div_type">{typeLabel}</p>
                    )}

                    {/* 4. Գին */}
                    {qrItem.type === "special" && (
                      <div className="qr_code_item_price_block">
                        <span>
                          {t("qr_standard_price")}: {qrItem.standard_price}{" "}
                          {currency}
                        </span>
                        <span>
                          {t("specialTicketDiscountLabel")}:{" "}
                          {qrItem.standard_price - qrItem.price} {currency}
                        </span>
                        <span className="final_price">
                          {t("qr_final_price")}: {qrItem.price} {currency}
                        </span>
                      </div>
                    )}

                    {/* 5. Օրեր և ժամեր */}
                    {qrItem.intervals && qrItem.intervals.length > 0 && (
                      <div className="qr_code_item_valid_hours">
                        <p className="qr_code_item_valid_hours_title">
                          {t("qr_valid_days_hours")}:
                        </p>
                        {qrItem.intervals.map((interval, index) => (
                          <p
                            key={index}
                            className="qr_code_item_valid_hours_row"
                          >
                            {getWeekDay(interval.weekday)}:{" "}
                            {interval.start_time}-{interval.end_time}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* QR-ը վերևում (CSS order: -1) */}
                  <div
                    className="qr_code_item_img_div"
                    style={{ background: qrItem.color }}
                  >
                    <div className="qr_code_item_img_div_qr_wrap">
                      <img src={qrItem.path} alt={qrItem.museum_address} />
                    </div>
                  </div>
                  <div className="price_and_openModal_div">
                    <p className="qr_code_item_bottom_price">
                      {qrItem.price} {currency}
                    </p>
                    <span
                      className="qr_code_item_settings"
                      onClick={(e) => openModal(e, qrItem.id)}
                    >
                      {setingIcon}
                    </span>
                  </div>
                  {modalOpen === qrItem.id && (
                    <div className="modal" ref={modalRef}>
                      <div className="modal-content" onClick={handleModalClick}>
                        <div className="modal-content_div">
                          <div
                            className="modal-content_div_line"
                            onClick={() => downloadImage(qrItem.path_base64)}
                          >
                            <img src={download} alt="download" />
                            <span>{t("qr_modal.0")}</span>
                          </div>
                          <div
                            className="modal-content_div_line"
                            onClick={() => dispatch(postQrItem(qrItem.id))}
                          >
                            <img src={sendEmail} alt="sendEmail" />{" "}
                            <span>{t("qr_modal.2")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      {respQrResult.success && qrMessage && (
        <OutSideErrorModal txt={respQrResult.message} shadow={true} />
      )}
    </div>
  );
}

export default QrCode;
