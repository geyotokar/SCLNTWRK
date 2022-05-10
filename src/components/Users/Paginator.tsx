import React, {useState} from 'react';
import '../../assets/Form.css'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}
const Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage,
                                            onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages: Array<number>= [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    const prev = String.fromCharCode(8701)
    const next = String.fromCharCode(8702)

    return <div className='paginator'>
        {portionNumber > 1 &&
        <button className='prevButton' onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>{prev}</button>}
        <div className='page'>
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span
                    className={`${currentPage === p ? 'selectedPage' : 'noSelectedPage'} field pageText`}
                    key={p} onClick={() => {onPageChanged(p)}}>{p}
                </span>
            })}
        </div>
        {portionCount > portionNumber &&
        <button className='nextButton' onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>{next}</button>}
    </div>
}

export default Paginator