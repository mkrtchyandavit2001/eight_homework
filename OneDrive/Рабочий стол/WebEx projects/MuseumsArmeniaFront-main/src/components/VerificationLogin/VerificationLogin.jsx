import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadSpinner from '../LoadSpinner/LoadSpinner'
import { postVerifyAccount } from '../../store/slices/VerifyAccountSlice/VerifyAccountApi'
import { getData, selectVerifyAccount } from '../../store/slices/VerifyAccountSlice/VerifyAccountSlice'
import Timer from '../Timer/Timer'
import { useTranslation } from 'react-i18next'
import { postRepeatVerifyCode } from '../../store/slices/RepeatVerifyCodeSlice/RepeatVerifyCodeApi'
import { selectLogin, selectLoginLoading } from '../../store/slices/LoginSlice/LoginSlice'

 function VerificationLogin({email, setOpenVerifyModal}) {

    console.log(email,'hhhh');

    const {t, i18n} = useTranslation()
    
    const [otp, setOtp] = useState(new Array(5).fill(""))
    const dispatch = useDispatch()
    const respLogin = useSelector(selectLogin)
    const loginLoading = useSelector(selectLoginLoading)
    const errMessage = useSelector(getData)

    console.log(respLogin.data, 'ddd');
    const handleChange = (e, index) => {
        if (isNaN(e.target.value)) return false
            
        setOtp([...otp.map((data, indx) => (indx === index ? e.target.value : data))])

        if(e.target.value && e.target.nextSibling){
            e.target.nextSibling.focus()
        }
    }


    const handleSubmitVerificationForm = (e) =>{
        e.preventDefault()

        const [inp1, inp2, inp3, inp4, inp5] = e.target

        if (inp1.value && inp2.value && inp3.value && inp4.value && inp5.value) {
            
            const verificationObj = {
                token: `${inp1.value}${inp2.value}${inp3.value}${inp4.value}${inp5.value}`,
                email: email.current.value
            }

            

            dispatch(postVerifyAccount(verificationObj))
        }
    }


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
    {loginLoading === 'pending' ? <LoadSpinner/> : loginLoading === 'rejected' && (!respLogin.data.is_verify )? (<div className='verification_modal' onClick={() => setOpenVerifyModal(false)}>
        <form className='verification_modal_block' onSubmit={handleSubmitVerificationForm} onClick={(e) => e.stopPropagation()}>
        <div className='verification_modal_block_title'>
            <p>{t('verifyAccount.0')}</p>
            <p>{respLogin.data?.message}</p>
        </div>

            {loginLoading === 'rejected' && <div className='opt_div_verify'>
                <span>{email.current.value}</span>
                <div className='verify_inputs_div'>
                    {
                      otp.map((data, i) => {
                            return <input key={i} type='text' maxLength={1} value={data} onChange={(e) => handleChange(e, i)} onKeyDown={handleKeyDown} onPaste={handlePaste}/>
                        })
                    }
                </div>
                    <Timer email={email} axios={postRepeatVerifyCode}/>
                    {<span>{errMessage?.message}</span>}


                <button type='submit' className='verification_btn'>{t('buttons.2')}</button>
            </div>}
        </form>

    </div>) : ''}
    
    </>
  )
}

export default VerificationLogin