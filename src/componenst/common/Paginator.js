import React from "react";

export default function Paginator({
                                      totalUsersCount,
                                      pageSize,
                                      currentPage,
                                      onPageChanged
                                  }) {
    const pagesCount = Math.ceil(totalUsersCount / pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className='page__selector'>
            {pages.map(p => {
                return <span key={p} className={currentPage === p ? 'selectedPage' : ''}
                             onClick={() => {
                                 onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>
    )
}