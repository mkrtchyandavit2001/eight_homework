import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductLength,
  getSetAllBasketData,
  getSetModalIsOpenShop,
  setCardErrorModal,
  setModalIsOpenShop,
} from "../../store/slices/Shop/ShopSlice";
import "./CardModal.css"; // Import CSS file for modal styles
import { useTranslation } from "react-i18next";
import {
  getDelateProductBasket,
  postAllBasketDataDoingPurchase,
} from "../../store/slices/Shop/ShopApi";
import Trash from "../../images/Trash.svg";
import { BagIcon, CloseIcon } from "../../iconFolder/icon";

const baseContentStyles = {
  top: "70px",
  left: "auto",
  right: "0",
  bottom: "0",
  transform: "translateY(0%)",
  background: "transparent",
  padding: "0",
  border: "0",
  minWidth: "400px",
  width: "25%",
  height: "100vh",
  overflowY: "auto",
  color: "#000000",
};

const getTicketPriceInfo = (el) => {
  const newPrice = Number(el?.total_price) || 0;
  const std = el?.standard;

  if (!std || !std.discount_type) {
    return {
      oldPrice: newPrice,
      newPrice,
      hasDiscount: false,
      discountAmount: 0,
      discountType: null,
      discountValue: 0,
    };
  }

  const oldPrice = Number(std.total_price) || 0;
  const discountAmount =
    Number(std.discount_total) || Math.max(oldPrice - newPrice, 0);

  return {
    oldPrice,
    newPrice,
    hasDiscount: oldPrice > newPrice && discountAmount > 0,
    discountAmount,
    discountType: std.discount_type,
    discountValue: std.discount_value,
  };
};

function CardModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const ModalIsOpenShop = useSelector(getSetModalIsOpenShop);
  const AllBasketData = useSelector(getSetAllBasketData);
  const productLength = useSelector(getProductLength);

  const [ticketErrors, setTicketErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = ModalIsOpenShop ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [ModalIsOpenShop]);

  useEffect(() => {
    if (!ModalIsOpenShop) setTicketErrors({});
  }, [ModalIsOpenShop]);

  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const modalStyles = useMemo(
    () => ({
      content: { ...baseContentStyles, top: windowWidth < 1025 ? "0" : "70px" },
    }),
    [windowWidth],
  );

  function closeModal() {
    dispatch(setModalIsOpenShop(false));
  }

  const removeElemBas = (id) => {
    setTicketErrors((prev) => {
      if (!(id in prev)) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
    dispatch(getDelateProductBasket(id));
  };

  const products = AllBasketData?.products ?? [];
  const tickets = AllBasketData?.tickets ?? [];
  const isEmpty = products.length === 0 && tickets.length === 0;

  const sendBakstAllDataPayment = () => {
    const arr = [];

    products.forEach((el) => {
      arr.push({
        type: "product",
        product_id: el.product_id,
        quantity: el.quantity,
      });
    });

    tickets.forEach((el) => {
      if (el.type === "united") {
        arr.push({
          type: el.type,
          id: el.ticket_id,
          quantity: el.quantity,
          museum_ids: el.museum_ids,
        });
      } else {
        arr.push({
          type: el.type,
          cart_item_id: el.cart_item_id ?? el.id,
          id: el.ticket_id,
          quantity: el.quantity,
          ...(el.sub_type && { sub_type: el.sub_type }),
        });
      }
    });

    const sendObj = {
      request_type: "cart",
      request_name: "web",
      redirect_url: window.location.href,
      items: arr,
    };

    setTicketErrors({});
    dispatch(postAllBasketDataDoingPurchase(sendObj)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        const url = res.payload?.data?.redirect_url;
        if (url) window.location.href = url;
      } else if (res.meta.requestStatus === "rejected") {
        const payload = res.payload;
        const failedCartItemId = payload?.data?.cart_item_id;

        if (failedCartItemId !== undefined && failedCartItemId !== null) {
          // Սխալը կոնկրետ տոմսի մասին է՝ ցույց ենք տալիս տոմսի տակ
          setTicketErrors({
            [failedCartItemId]: payload?.message || "",
          });
        } else {
          dispatch(setCardErrorModal(true));
        }
      }
    });
  };

  const ticketsType_for_private = t("ticketsType_for_private", {
    returnObjects: true,
  });

  const totalCount = useMemo(() => {
    const productsTotal = products.reduce(
      (acc, item) => acc + (item?.total_price || 0),
      0,
    );
    const ticketsTotal = tickets.reduce(
      (acc, item) => acc + (item?.total_price || 0),
      0,
    );
    return productsTotal + ticketsTotal;
  }, [products, tickets]);

  return (
    <Modal
      isOpen={ModalIsOpenShop}
      onRequestClose={closeModal}
      style={modalStyles}
      ariaHideApp={false}
      contentLabel="Cart Modal"
    >
      <div className={"xxx"}>
        <div className="all_baskets_top_card">
          <div className="card_top_all_baskets">
            {/* Փակելու կոճակ */}
            <p onClick={closeModal} className="closeBtn_basket">
              <CloseIcon width="23" height="23" />
            </p>

            {/* Զամբյուղի պատկերակ */}
            <div className="shop_icon_with_count">
              <BagIcon width="40" height="40" />
              <p className="shop_icon_count">{productLength}</p>
            </div>

            {/* Վերնագիր */}
            <p className="cart_title">{t("yourCartTitle")}</p>
          </div>

          {/* Հաղորդագրություն */}
          <p className="cart_message">{t("yourCartMessage")}</p>
        </div>

        <div
          className={windowWidth < 1025 ? "all_baskets_height" : "all_baskets"}
        >
          {!isEmpty ? (
            <>
              {products.map((el) => (
                <div key={`product_${el.id}`} className="basket_box">
                  <div className="left_div_basket_box">
                    <img
                      src={el.image}
                      alt={el.name}
                      className="basket_box_img"
                    />
                    <div className="basket_box_div">
                      <p>
                        <b className="basket_box_div_name">{el.name}</b>
                      </p>
                      <p className="museumName">{el.museum_name}</p>
                      <p>{el.quantity + "|" + el.total_price + " AMD"}</p>
                    </div>
                  </div>
                  <p
                    className="delate_button"
                    onClick={() => removeElemBas(el.id)}
                  >
                    <img src={Trash} alt="Trash" className="trash_icon" />
                  </p>
                </div>
              ))}

              {tickets.map((el) => {
                const {
                  oldPrice,
                  newPrice,
                  hasDiscount,
                  discountAmount,
                  discountType,
                  discountValue,
                } = getTicketPriceInfo(el);

                const typeKey =
                  el.type === "event-config" ? "event_config" : el.type;
                const typeLabel = ticketsType_for_private.find(
                  (o) => Object.keys(o)[0] === typeKey,
                );
                const subLabel = ticketsType_for_private.find(
                  (o) => Object.keys(o)[0] === el.sub_type,
                );

                const cartItemId = el.cart_item_id ?? el.id;
                const errorMessage = ticketErrors[cartItemId];

                return (
                  <div key={`ticket_${el.id}`} className="basket_box_ticket">
                    <div>
                      {typeLabel && (
                        <p>
                          {Object.values(typeLabel)[0]}{" "}
                          {el.name && "/ " + el.name}
                        </p>
                      )}
                      {subLabel && <p>{Object.values(subLabel)[0]}</p>}
                      <p className="museumName">{el.museum_name}</p>
                      <p>{el.date}</p>

                      <div className="ticket_price_block">
                        <p>{el.quantity} |</p>
                        {hasDiscount ? (
                          <>
                            <p>
                              <span className="old_price">{oldPrice} AMD</span>
                            </p>
                            <p className="discount_amount">
                              {t("discount", "Զեղչ")}: -{discountAmount} AMD
                              {discountType === "percent" &&
                                ` (${discountValue}%)`}
                            </p>
                            <p>
                              <span className="special_price">
                                {newPrice} AMD
                              </span>
                            </p>
                          </>
                        ) : (
                          <p>{newPrice} AMD</p>
                        )}
                      </div>

                      {errorMessage && (
                        <p className="ticket_error_message">{errorMessage}</p>
                      )}
                    </div>
                    <p
                      className="delate_button"
                      onClick={() => removeElemBas(el.id)}
                    >
                      <img src={Trash} alt="Trash" className="trash_icon" />
                    </p>
                  </div>
                );
              })}
            </>
          ) : (
            <div style={{ marginTop: "60px", textAlign: "center" }}>
              {t("shop_page_data.3")}
            </div>
          )}
          <p style={{ textAlign: "center" }}>
            {t("infoBuyTicket.4")} {totalCount} AMD
          </p>
        </div>
        <div className="checkout_delete_block">
          <div className="checkout_btn" onClick={sendBakstAllDataPayment}>
            {t("cardCheckout")}
          </div>
          <button
            onClick={() => {
              setTicketErrors({});
              dispatch(getDelateProductBasket("all_items"));
            }}
          >
            {t("cardDelte")}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default CardModal;
