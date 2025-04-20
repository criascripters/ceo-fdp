import { useMemo } from 'react'
import './index.css'

/**
 * Alerta que aparece quando o P.O. está fora do seu horário de cobrança.
 */
export default function OutOfOfficeWarning() {
  // #region States
  const showWarning = useMemo(() => {
    const currentHour = new Date().getHours()
    return currentHour <= 18 || currentHour < 8
  }, [])
  // #endregion

  if (!showWarning) return <></>

  return (
    <div
      className="flex items-center justify-center gap-2 flex-none w-full p-2 leading-none
        text-center font-bold text-[0.85rem]
        bg-red-500 text-white
      "
    >
      <img className="clock" src="./clock.png" alt="relógio" />
      <span>JÁ PASSOU DAS 18H MALUCO, TO NO BAR BEBENDO. VOLTO A MANDAR MENSAGENS AMANHÃ ÀS 8H</span>
    </div>
  )
}
