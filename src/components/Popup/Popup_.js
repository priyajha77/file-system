import React, { useState } from 'react';
import styles from './Popup.module.css';
import CreateNew from '../../assets/Group 11.png'
import Image from 'next/image';
import Popup from 'reactjs-popup';
import {CgClose} from 'react-icons/cg';
// import { useRouter } from 'next/router';
import {useForm} from 'react-hook-form'


const PopupWindow = ({path,router}) => {
    const [formData, setFormData] = useState();
    const {register, handleSubmit, formState:{errors}} = useForm();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value.trim()
        });
    };

    const createFolder = async() => {
        const response = await fetch(path===undefined ? '/api' : '/api/root/'+path.join("/"), {
            method:"POST",
            body: JSON.stringify({formData}),
            headers:{
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();
        console.log("Posted data")
        console.log(data)
        if(response.status < 300)
        {
            router.replace(router.asPath)
        }
    }
    const onSubmit = (data) => {
        console.log(data)
        setFormData(data)
        console.log(formData)
        console.log("Register")
        console.log(register)
    }
  return (
    <>
    
    {/* <pre>{JSON.stringify(formData, undefined, 5)}</pre> */}
        <Popup trigger=
            {<button className={styles.button}><Image src={CreateNew} alt="Create New"/> </button>}
            modal nested>
            { close => (
                <div className={styles.popup_window}>
                    <div className={styles.popup_header}>
                        Create New <button onClick={()=>close()}><CgClose className={styles.popup_close} /></button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.popup_checkbox_button}>
                            <input type="radio" id="file" name="type" value="file" {...register('type', {required:"Type is required!!!"})}/>
                            <label htmlFor="file">File</label>
                            <input type="radio" id="folder" name="type" value="folder" {...register('type', {required:"Type is required!!!"})}/>
                            <label htmlFor="folder">Folder</label>
                            <p>{errors?.type?.message}</p>
                        </div>
                        <div className={styles.popup_input}>
                            <input type="text" id="name" name="name" placeholder='Name' {...register('name', {required:"File name is required!!!"})}/>
                            <p>{errors?.name?.message}</p>
                            <input type="text" id="creator" name="creator" placeholder='Creator' {...register('creator', {required:"Creator is required!!!"})}/>
                            <p>{errors?.creator?.message}</p>
                            <input type="text" id="size" name="size" placeholder='Size' {...register('size', {required:"Size is required!!!"})}/>
                            <p>{errors?.size?.message}</p>
                            <input type="date" id="date" name="date" placeholder='Date' {...register('date', {required:"Date is required!!!"})}/>
                            <p>{errors?.date?.message}</p>
                        </div>
                        <div className={styles.popup_submit_button}>
                            <button type='submit'>Create</button>
                        </div>
                    </form>
                </div>)
            }
        </Popup>

        </>
  )
}

export default PopupWindow


