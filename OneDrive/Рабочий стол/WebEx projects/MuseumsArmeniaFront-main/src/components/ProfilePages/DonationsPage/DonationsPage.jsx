import React, { useEffect } from "react";
import "./DonationsPage.css";
import { useDispatch, useSelector } from "react-redux";
import { getDonationList } from "../../../store/slices/DonationSlice/DonationApi";
import {
  selectDonationList,
  selectDonationLoading,
} from "../../../store/slices/DonationSlice/DonationSlice";
import LoadSpinner from "../../LoadSpinner/LoadSpinner";
import { useTranslation } from "react-i18next";
function DonationsPage() {
  const dispatch = useDispatch();
  const donationList = useSelector(selectDonationList);
  const isLoading = useSelector(selectDonationLoading);
  const {t} = useTranslation()
  useEffect(() => {
    dispatch(getDonationList());
  }, [dispatch]);

  if (isLoading === "loading") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <LoadSpinner fullBackColor="white" />
      </div>
    );
  }
  return (
    <div className="donationsPage">
      <div className="container">
        <p style={{ fontWeight: "700" }}>{t('donationsList.title')}</p>

        <table className="donations_table">
          <thead>
            <tr>
              <th>{t('donationsList.tableHead.id')}</th>
              <th>{t('donationsList.tableHead.museum_name')}</th>
              <th>{t('donationsList.tableHead.amount')}</th>
              <th>{t('donationsList.tableHead.date')}</th>
              <th>{t('donationsList.tableHead.status')}</th>
            </tr>
          </thead>

          {donationList.length > 0 &&
            donationList.map((item) => (
              <tbody>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.museum.translations[0].name}</td>
                  <td>{item.payments[0].amount} {t('donationBlock.priceType')}</td>
                  <td>
                    {new Date(item.payments[0].created_at)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")}
                  </td>
                  <td>
                    <span style={{backgroundColor: item.payments[0].status === "pending" ? "#f7e653a4" : item.payments[0].status === "confirmed" ? "#E5FFE8" : '#e46c48ff',  padding: '2px 8px', borderRadius: "5px"}}>{t(`donationsList.status.${item.payments[0].status}`)}</span>
                    </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
}

export default DonationsPage;
