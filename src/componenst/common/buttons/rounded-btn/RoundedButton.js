import style from './RoundedButton.module.css'


export default function RoundedButton({logo, action, type=''}) {
    return <button className={style.btn} type={type} onClick={action}>{logo}</button>
}