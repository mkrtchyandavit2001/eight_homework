import React, { memo } from "react";
import { useSelector } from "react-redux";
import IsWrong from "../../IsWrong";
import { useTranslation } from "react-i18next";
import { MinusButtonIcons, PlusButtonIcons } from "../../../../iconFolder/icon";

const DiscountBadge = ({ items, t }) => {
  if (!items.discount_type || !items.standard_price) return null;

  const discountAmount = items.standard_price - items.price;

  return (
    <span className="ticketRow-discountBadge">
      <span className="ticketRow-oldPrice">
        {items.standard_price} {t("single_shop_page.0")}
      </span>{" "}
      {t("specialTicketDiscountLabel")} -{discountAmount}{" "}
      {t("single_shop_page.0")}
      {items.discount_type === "percent" && ` (${items.discount_value}%)`}
    </span>
  );
};
const ScheduleTable = ({ intervals, t }) => {
  if (!Array.isArray(intervals) || intervals.length === 0) return null;
  return (
    <div className="ticketRow-schedule">
      <div className="ticketRow-schedule-title">
        {t("specialTicketScheduleLabel")}
      </div>
      <div className="ticketRow-schedule-list">
        {intervals.map((interval, i) => (
          <div className="ticketRow-schedule-row" key={i}>
            <span>{t(`weekDaysList.${interval.weekday % 7}`)}</span>
            <span>
              {interval.start_time}-{interval.end_time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TicketCounter = ({ items, hendleClickItems }) => (
  <div className="ticketRow-counter">
    <span
      className={`ticketRow-counter-btn ${items.count === 0 ? "is-disabled" : ""}`}
      onClick={() => hendleClickItems("down", items)}
    >
      <MinusButtonIcons width="14" height="14" />
    </span>
    <p className={items.count > 0 ? "is-active" : ""}>{items.count}</p>
    <span
      className={`ticketRow-counter-btn ${items.count >= items.max ? "is-disabled" : ""}`}
      onClick={() => hendleClickItems("up", items)}
    >
      <PlusButtonIcons width="17" height="17" />
    </span>
  </div>
);

const BuyTicketBlock = ({ hendleClickItems }) => {
  const { tickets, specialTicket, ticketLoading, success, responseMessages } =
    useSelector((state) => state.museumTicket);
  const { dataMuseumOne } = useSelector((state) => state.museumPages);
  const { t } = useTranslation();

  const specialPriceTotal = specialTicket
    ? specialTicket.price * specialTicket.count
    : 0;
  const totalPrice =
    tickets.reduce((acum, item) => acum + item.price * item.count, 0) +
    specialPriceTotal;

  const visibleTickets = tickets.filter(
    (items) =>
      items.type !== "subscription" &&
      items.type !== "discount" &&
      items.type !== "free" &&
      items.type !== "special",
  );

  return (
    <div className="BuyTicketBlock-parent">
      {/* ------- Ստանդարտ / այլ տոմսեր ------- */}
      <div className="BuyTicketBlock-list">
        {visibleTickets.length > 0 ? (
          visibleTickets.map((items, idx) => (
            <div key={idx} className="ticketRow">
              <div className="ticketRow-info">
                <p className="ticketRow-name">
                  {t(`${items.type}`)} -{" "}
                  <span
                    style={{ color: items.price > 0 ? "#000000" : "#a6a6a6" }}
                  >
                    {items.price} {t("single_shop_page.0")}
                  </span>
                </p>
                <DiscountBadge items={items} t={t} />
              </div>
              <TicketCounter
                items={items}
                hendleClickItems={hendleClickItems}
              />
            </div>
          ))
        ) : (
          <IsWrong text={t("isWrong.1")} height={"auto"} />
        )}
      </div>

      {/* ------- Հատուկ Տոմս (fallback endpoint-ից) ------- */}
      {specialTicket && (
        <div className="ticketRow ticketRow-special">
          <div className="ticketRow-top">
            <div className="ticketRow-info">
              <p className="ticketRow-name">
                {t("specialTicketLabel")} -{" "}
                <span
                  style={{
                    color: specialTicket.price > 0 ? "#000000" : "#a6a6a6",
                  }}
                >
                  {specialTicket.price} {t("single_shop_page.0")}
                </span>
              </p>
              <DiscountBadge items={specialTicket} t={t} />
            </div>
            <TicketCounter
              items={specialTicket}
              hendleClickItems={hendleClickItems}
            />
          </div>
          <ScheduleTable intervals={specialTicket.intervals} t={t} />
        </div>
      )}

      {dataMuseumOne.guide && (
        <div className="BuyTicketBlock-list-price">
          <p>
            {t("infoBuyTicket.1")}{" "}
            <span>
              {dataMuseumOne.guide.am} {t("single_shop_page.0")}
            </span>
          </p>
          <p>
            {t("infoBuyTicket.2")}{" "}
            <span>
              {dataMuseumOne.guide.other} {t("single_shop_page.0")}
            </span>
          </p>
          <p>{t("infoBuyTicket.3")}</p>
        </div>
      )}

      <div className="BuyTicketBlock-list-totalPrice">
        <p>
          {t("infoBuyTicket.4")} :{" "}
          <span style={{ color: totalPrice > 0 ? "#000000" : "#a6a6a6" }}>
            {totalPrice} {t("single_shop_page.0")}
          </span>
        </p>
      </div>

      {ticketLoading === "rejected" && success === false && (
        <div className="BuyTicketBlock-list-warning">
          <p>{responseMessages}</p>
        </div>
      )}
    </div>
  );
};

export default memo(BuyTicketBlock);
