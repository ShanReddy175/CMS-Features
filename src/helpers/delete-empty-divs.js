

export const deleteEmptyDivs = (col) => {
    const insidedivs = col.querySelectorAll('div');
    let emptyDivs =  [...insidedivs].filter((colele => {
        const condition1 = [...colele.children] == 0;
        const condition2 = [...colele.classList].length == 0;

        return condition1 && condition2;
    }));

    [...emptyDivs].forEach((ele, index)=>{
        col.removeChild(ele)
    })
}