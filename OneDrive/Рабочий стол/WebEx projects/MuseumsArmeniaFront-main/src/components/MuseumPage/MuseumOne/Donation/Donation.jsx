
// Donation.jsx
import React, { useEffect, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Donation.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getDonationList,
  getDonationPriceList,
  sendDonationPerson,
} from "../../../../store/slices/DonationSlice/DonationApi";
import {
  selectDonationPriceList,
  selectDonationModal,
  openDonationModal,
  selectAmount, // action (assumed)
  closeDonationModal,
  selectDonationSelectedAmount,
} from "../../../../store/slices/DonationSlice/DonationSlice";
import DonationForm from "./DonationForm";
import Modal from "react-modal";
import { CloseMessagesBtn } from "../../../../iconFolder/icon";
import { getIsAuth } from "../../../../store/slices/Auth/AuthSlice";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const customStyles = {
  content: {
    top: "53%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "none",
    padding: "0",
  },
};

function Donation() {
  const dispatch = useDispatch();
  const donationPriceList = useSelector(selectDonationPriceList) || [];
  const isOpen = useSelector(selectDonationModal);
  const isAuth = useSelector(getIsAuth);
  const selectedAmount = useSelector(selectDonationSelectedAmount);
  const { id } = useParams();

  const { t } = useTranslation();

  const validationSchema = useMemo(() => {
    const allowedAmounts = donationPriceList.map((p) => String(p.amount));
    allowedAmounts.push("other");

    return Yup.object().shape({
      donat_message: Yup.string().max(
        500,
        t("donationBlock.validations.messageMax")
      ),
      donat_price_choice: Yup.string()
        .oneOf(allowedAmounts, t("donationBlock.validations.invalidChoice"))
        .required(t("donationBlock.validations.choosePrice")),
      donat_price_other: Yup.number()
        .typeError(t("donationBlock.validations.otherTypeError"))
        .when("donat_price_choice", (val, schema) => {

          return val === "other"
            ? schema
                .required(t("donationBlock.validations.otherRequired"))
                .min(500, t("donationBlock.validations.otherMin", { min: 500 }))
            : schema.notRequired();
        }),
    });
  }, [donationPriceList]);

  const formik = useFormik({
    initialValues: {
      donat_message: "",
      donat_price_choice: "other",
      donat_price_other: "",
    },
    enableReinitialize: false,
    validationSchema,

    onSubmit: async (values, { setSubmitting, resetForm }) => {
  const amount =
    values.donat_price_choice === "other"
      ? Number(values.donat_price_other)
      : Number(values.donat_price_choice);

  // --- STOP submit if amount is invalid or empty ---
  if (!amount || isNaN(amount) || amount < 500) {
    console.warn("Invalid donation amount:", amount);
    setSubmitting(false);
    formik.setFieldError("donat_price_other", t("donationBlock.validations.otherMin", { min: 500 }));
    
    return; 
  }

  const payload = {
    message: values.donat_message.trim(),
    amount,
  };

  try {
    if (!showOtherMinWarning) {
      if (isAuth) {
        const donationAmountId =
          values.donat_price_choice === "other"
            ? null
            : selectedAmount?.id ?? null;

        const res = await dispatch(
          sendDonationPerson({
            amount: String(amount),
            museum_id: id,
            donation_amount_id: donationAmountId,
            guard_name: "web",
          })
        );

        if (res?.payload?.success) {
          dispatch(closeDonationModal());
          if (res.payload.data?.redirect_url) {
            window.open(res.payload.data.redirect_url);
          }
        }
      } else {
        setTimeout(() => {
          dispatch(openDonationModal());
          resetForm();
          setSubmitting(false);
        }, 700);
      }
    }
  } catch (err) {
    console.error("Donation error: ", err);
    dispatch(openDonationModal());
  } finally {
    setSubmitting(false);
  }
}

  });

  useEffect(() => {
    dispatch(getDonationPriceList());
  }, [dispatch]);

  useEffect(() => {
    if (
      donationPriceList &&
      donationPriceList.length > 0 &&
      formik.values.donat_price_choice !== "other"
    ) {
      const matched = donationPriceList.find(
        (p) => String(p.amount) === String(formik.values.donat_price_choice)
      );
      if (matched) {
        dispatch(selectAmount(matched));
      }
    }
  }, [donationPriceList]);

  const handleSelectAmount = (item) => {
    if (item === "other") {
      dispatch(selectAmount(null));
      formik.setFieldValue("donat_price_choice", "other");
      formik.setFieldValue("donat_price_other", "");
    } else {
      dispatch(selectAmount(item));
      formik.setFieldValue("donat_price_choice", String(item.amount));
      formik.setFieldValue("donat_price_other", "");
    }
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value;
    formik.setFieldValue("donat_price_choice", "other");
    formik.setFieldValue("donat_price_other", value);

    const numericValue = Number(value);

    if (!isNaN(numericValue) && numericValue >= 500) {
      dispatch(selectAmount({ amount: numericValue, id: null }));
    } else {
      dispatch(selectAmount(null));
    }
  
  };

  const handleCloseModal = () => {
    dispatch(closeDonationModal());
  };

  const showOtherMinWarning =
    formik.values.donat_price_choice === "other" &&
    formik.values.donat_price_other !== "" &&
    Number(formik.values.donat_price_other) < 500;

  return (
    <div className="donation_block">
      <h4 className="donation_title">{t("donationBlock.title")}</h4>
      <p className="donation_text">{t("donationBlock.description")}</p>

      <form className="donation_form" onSubmit={formik.handleSubmit} noValidate>
        <textarea
          className="donation_form_textArea"
          name="donat_message"
          placeholder={t("donationBlock.textareaPlaceholder")}
          value={formik.values.donat_message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.donat_message && formik.errors.donat_message ? (
          <div className="donation_error">{formik.errors.donat_message}</div>
        ) : null}

        <div className="donation_form_price_list">
          <span>{t("donationBlock.selectPrice")}</span>
          <div className="donation_form_prise_list_radios">
            {donationPriceList?.map((item) => (
              <label key={item.id}>
                <input
                  type="radio"
                  name="donat_price_choice"
                  value={String(item.amount)}
                  checked={
                    String(formik.values.donat_price_choice) ===
                    String(item.amount)
                  }
                  onChange={() => handleSelectAmount(item)}
                />
                <span>
                  {item.amount} {t("donationBlock.priceType")}
                </span>
              </label>
            ))}

            <label>
              <input
                type="radio"
                name="donat_price_choice"
                value="other"
                checked={formik.values.donat_price_choice === "other"}
                onChange={() => handleSelectAmount("other")}
              />
              <span>{t("donationBlock.otherBtn")}</span>
            </label>
          </div>
        </div>

        {formik.values.donat_price_choice === "other" && (
          <div style={{ marginTop: 8 }}>
            <input
              type="text"
              name="donat_price_other"
              placeholder={t("donationBlock.otherInputPlaceholder")}
              value={formik.values.donat_price_other}
              onChange={handleCustomAmount}
              onBlur={formik.handleBlur}
              className="price_input"
              inputMode="numeric"
            />
            
            {showOtherMinWarning && (
              <div
                className="donation_error"
                style={{ marginTop: 6, fontSize: 13, opacity: 0.85 }}
              >
                {t("donationBlock.validations.otherMin", { min: 500 })}
              </div>
            )}
            {formik.touched.donat_price_other &&
            formik.errors.donat_price_other ? (
              <span className="donation_error">
                {formik.errors.donat_price_other}
              </span>
            ) : null}
          </div>
        )}

        <button
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
          className="donate_form_btn"
        >
          {formik.isSubmitting
            ? t("donationBlock.processingBtn")
            : t("donationBlock.sendBtn")}
        </button>
      </form>

      <Modal
        isOpen={isOpen}
        style={{ ...customStyles }}
        ariaHideApp={false}
        contentLabel="Donation Modal"
      >
        <div className="child_modallTicket">
          <div className="donation_modal-close" onClick={handleCloseModal}>
            <CloseMessagesBtn width="20px" height="20px" />
          </div>
          <DonationForm />
        </div>
      </Modal>
    </div>
  );
}

export default Donation;

