import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Timer from '../Timer/Timer'
import { useTranslation } from 'react-i18next'
import { selectResetPasswordWithEmail, selectResetPasswordWithEmailLoading } from '../../store/slices/ResetPasswordWithEmailSlice/ResetPasswordWithEmailSlice'
import LoadSpinner from '../LoadSpinner/LoadSpinner'
import { postCheckForgotToken } from '../../store/slices/CheckForgotTokenSlice/CheckForgotTokenApi'
import { selectCheckForgotToken, selectCheckForgotTokenLoading } from '../../store/slices/CheckForgotTokenSlice/CheckForgotTokenSlice'
import { useNavigate } from 'react-router-dom'
import { postResendForgot } from '../../store/slices/ResendForgotSlice/ResendForgotApi'
import './VerificationEmailComponent.css'

 function VerificationEmailComponent({email, setOpenVerifyModal}) {

    const {t, i18n} = useTranslation()
    const leng = localStorage.getItem('lang')
    const respEmail = useSelector(selectResetPasswordWithEmail)
    const loading = useSelector(selectResetPasswordWithEmailLoading)
    const CheckForgotTokenLoading = useSelector(selectCheckForgotTokenLoading)
    const errMessage = useSelector(selectCheckForgotToken)
    const [f,setF] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        setF(errMessage.data.success)
    },[errMessage.data.success])

    
    const [otp, setOtp] = useState(new Array(5).fill(""))
    const dispatch = useDispatch()

    const handleChange = (e, index) => {
        if (isNaN(e.target.value)) return false
            
        setOtp([...otp.map((data, indx) => (indx === index ? e.target.value : data))])

        if(e.target.value && e.target.nextSibling){
            e.target.nextSibling.focus()
        }
    }

    console.log(errMessage.data.success,'ddddd');
    const handleSubmitVerificationForm = async (e) => {
        e.preventDefault();
    
        const [inp1, inp2, inp3, inp4, inp5] = e.target;
    
        if (inp1.value && inp2.value && inp3.value && inp4.value && inp5.value) {
            const verificationObj = {
                token: `${inp1.value}${inp2.value}${inp3.value}${inp4.value}${inp5.value}`,
                email: email.current.value
            };
    
            await dispatch(postCheckForgotToken(verificationObj));
    
            sessionStorage.setItem('verificationEmail', email.current.value);
            sessionStorage.setItem('verificationToken', `${inp1.value}${inp2.value}${inp3.value}${inp4.value}${inp5.value}`);
    
        }
    };

    useEffect(()=>{
        if (errMessage.data.success) {
            navigate(`/${leng}/reset-password`)
        }
    },[errMessage.data.success])


    const handleKeyDown = (e) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            if (!e.target.value && e.target.previousElementSibling) {
                e.target.previousElementSibling.focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text');
        const updatedOtp = [...otp];
        let index = 0;
      
        for (let i = 0; i < updatedOtp.length && index < pasteData.length; i++) {
          if (!isNaN(pasteData[index])) {
            updatedOtp[i] = pasteData[index];
            index++;
          }
        }
      
        setOtp(updatedOtp);
      };
  return (
    <>
    {loading === 'pending' ? <LoadSpinner/> : loading === 'fulfilled' && respEmail?.data?.success  ?(<div className='verification_modal' onClick={() => setOpenVerifyModal(false)}>
        <form className='verification_modal_block' onSubmit={handleSubmitVerificationForm} onClick={(e) => e.stopPropagation()}>
        <div className='verification_modal_block_title'>
            <p>{t('verifyAccount.0')}</p>
            <p>{respEmail?.data?.message}</p>
        </div>

             {loading === 'fulfilled' && <div className='opt_div_verify'>
                <span>{email.current.value}</span>
                <div className='verify_inputs_div'>
                    {
                      otp.map((data, i) => {
                            return <input key={i} type='text' maxLength={1} value={data} onChange={(e) => handleChange(e, i)} onKeyDown={handleKeyDown} onPaste={(handlePaste)} />
                        })
                    }
                </div>
                    <Timer email={email} axios={postResendForgot}/>
                    <span className='verification_code_message'>{errMessage?.data?.message}</span>


                <button type='submit' className='verification_btn'>{t('buttons.2')}</button>
            </div>}
        </form>

    </div>
    ): ''}
    </>
  )
}

export default VerificationEmailComponent