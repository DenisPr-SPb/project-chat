import React, {useState} from "react";
import RoundedButton from "./buttons/rounded-btn/RoundedButton";

export default function Paginator({
                                      totalItemsCount,
                                      pageSize,
                                      currentPage,
                                      onPageChanged,
                                      portionSize = 12
                                  }) {
    const pagesCount = Math.ceil(totalItemsCount / pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionNUmber = portionNumber * portionSize



    return (
        <div className='page__selector'>
            {portionNumber > 1 &&
                <RoundedButton logo={'Prev'} action={() => {setPortionNumber(portionNumber -1) }}/>}
            {pages.filter(page => page >= leftPortionNumber && page <= rightPortionNUmber).map(p => {
                return <span key={p} className={currentPage === p ? 'selectedPage' : ''}
                             onClick={() => {
                                 onPageChanged(p)
                             }}>{p}</span>
            })}
            {portionCount > portionNumber &&
                <RoundedButton logo={'Next'} action={() => {setPortionNumber(portionNumber + 1) }}>Next</RoundedButton>}
        </div>
    )
}