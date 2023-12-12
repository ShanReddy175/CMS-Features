            const leftsidearr = getFilteredArr(['left'], currentElement, values);
            const leftrightarrs = getFilteredArr(['left', 'right'], currentElement, values);
            

            const rightsidearr = getFilteredArr(['right'], currentElement, values);

            const rightleftarrs = getFilteredArr(['right', 'left'], currentElement, values);

            const topsidearr = getFilteredArr(['top'], currentElement, values);

            const topbottomarr = getFilteredArr(['top', 'bottom'], currentElement, values);


            const bottomsidearr = getFilteredArr(['bottom'], currentElement, values);


            const bottomtoparr = getFilteredArr(['bottom', 'top'], currentElement, values);

            const inlinecenterarr = getFilteredArr(['left', 'width'], currentElement, values, true);

            const blockcenterarr = getFilteredArr(['top', 'height'], currentElement, values, true);;

            if(leftsidearr?.length > 0 || leftrightarrs?.length > 0){    
                onRulerMatchFunc(
                    leftsidearr, 
                    leftrightarrs, 
                    ['top', 'bottom'], 
                    ['--_inline-start-new-ys-top', '--_inline-start-new-ys-bottom'],
                    setShowInlineStart,
                    rulerRef,
                    currentElement,
                    values
                )
            }


            if(rightsidearr?.length > 0 || rightleftarrs?.length > 0){
                onRulerMatchFunc(
                    rightsidearr, 
                    rightleftarrs, 
                    ['top', 'bottom'], 
                    ['--_inline-end-new-ys-top', '--_inline-end-new-ys-bottom'],
                    setShowInlineEnd,
                    rulerRef,
                    currentElement,
                    values
                )
            }

            if(topsidearr?.length > 0 || topbottomarr?.length > 0){
                onRulerMatchFunc(
                    topsidearr, 
                    topbottomarr, 
                    ['left', 'right'], 
                    ['--_block-start-new-xs-left', '--_block-start-new-xs-right'],
                    setShowBlockStart,
                    rulerRef,
                    currentElement,
                    values
                )
            }

            if(bottomsidearr?.length > 0 || bottomtoparr?.length > 0){
                onRulerMatchFunc(
                    bottomsidearr, 
                    bottomtoparr, 
                    ['left', 'right'], 
                    ['--_block-end-new-xs-left', '--_block-end-new-xs-right'],
                    setShowBlockEnd,
                    rulerRef,
                    currentElement,
                    values
                )
            }

            if(inlinecenterarr?.length > 0){                
                onRulerMatchFunc(
                    inlinecenterarr, 
                    [], 
                    ['top', 'bottom'], 
                    ['--_inline-center-new-ys-top', '--_inline-center-new-ys-bottom'],
                    setShowInlineCenter,
                    rulerRef,
                    currentElement,
                    values
                )
            }

            if(blockcenterarr?.length > 0){
                onRulerMatchFunc(
                    blockcenterarr, 
                    [], 
                    ['left', 'right'], 
                    ['--_block-center-new-xs-left', '--_block-center-new-xs-right'],
                    setShowBlockCenter,
                    rulerRef,
                    currentElement,
                    values
                )
            }
