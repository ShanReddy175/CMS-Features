


const playgroundcls = 'sc_col'; 

const resizerelecusror = {
    0:['s-resize', 'e-resize', 's-resize', 'e-resize'],
    1:['se-resize', 'sw-resize', 'nw-resize', 'ne-resize']
}

const resizeselectors = [
    'div[dataresize="true"] img',
    'div[dataresize="true"]',
    // '.element_wrapper',
        // '.resizer__toolbar span',
    '.resizer__toolbar *'
];;
const setStylesProperties = [
    '--_wrapper-width',
    '--_wrapper-height',
    '--_margin-left-value',
    '--_margin-top-value',
];
export const onResizerDragger = (resizerele) => {
    let resizetypes = ['sidebar', 'corners'];
    let resizerparentdiv = document.querySelectorAll('.resizer__toolbar > div > div');
    let isDragging = false;
    let offsetValue;
    let parentele = resizerele?.parentElement;

    resizerparentdiv.forEach((parent, parentindex)=>{
        let issidebarele = parent.getAttribute('data-hook') == resizetypes[0];
        parent.querySelectorAll('span').forEach(function(resizer, index, parentelechilds){
            resizer.addEventListener('mousedown', (e)=>{
                e.preventDefault();
                let datatype = resizer.getAttribute('datatype');
                let isblockele = datatype == 'block';
                let istopele = isblockele && resizer.getAttribute('datatypecount') == '1';
                let isleftele = !isblockele && resizer.getAttribute('datatypecount') == '1';
                isDragging = true;
                resizerele.style.cursor = resizerelecusror[issidebarele ? 0 : 1][index];
                offsetValue = issidebarele ? isblockele ? e.clientY : e.clientX : {x:e.clientX, y: e.clientY};


                document.addEventListener('mousemove', (e)=>{
                    if(isDragging){
                        e.preventDefault();
                        e.stopPropagation();
                        let xValue = e.clientX;
                        let yValue = e.clientY;


                        let resizerele_width_inpx = resizerele.clientWidth - (resizerele.clientWidth - xValue);
                        let resizerele_width = Math.ceil(((resizerele.clientWidth - (resizerele.clientWidth - xValue)) / parentele.clientWidth) * 100);
                        // let resizerele_width = resizerele.clientWidth - (resizerele.clientWidth - xValue);
                        let resizerele_height = resizerele.clientHeight - (resizerele.clientHeight - yValue);



                        let ivalue = istopele ? 3 : 2; 
                        let marginvalue = (istopele ? yValue - 90    : (Math.ceil((xValue / parentele.clientWidth) * 100) - 4));
                        let resizer_sizes = [resizerele_width, resizerele_height, Math.ceil((xValue / parentele.clientWidth) * 100) - 4, yValue - 70];

                        if(
                            resizerele_width_inpx >= parentele.clientWidth - 1 
                            // || 
                            // resizerele_width <= 10
                        ) return;

                        if(issidebarele){
                            if(istopele || isleftele){
                                resizerele.parentElement.style.setProperty(`${[...setStylesProperties][ivalue]}`, marginvalue);
                                return;
                            };

                            if(isblockele){
                                resizerele.parentElement.style.setProperty(`${[...setStylesProperties][1]}`, resizer_sizes[1]-70);
                                return;
                            }
                            // else{
                            // }
                            resizerele.parentElement.style.setProperty(`${[...setStylesProperties][0]}`, resizer_sizes[0]);
                            return;
                        }

                        const cornersfunctions = {
                            topleft : [2,3],
                            topright : [0,3],
                            bottomright : [0,1],
                            bottomleft: [1,2]
                        }
                        for(let i=0; i<[...setStylesProperties].length;i++){
                            // if(datatype=='bottomright'){
                            //     if(i<2){
                            //         resizerele.parentElement.style.setProperty(`${[...setStylesProperties][i]}`, i == 1 ? resizer_sizes[i] - 70 : resizer_sizes[i]);
                            //     }
                            // }
                            if([...cornersfunctions[datatype]].some(ele => ele == i)){
                                resizerele.parentElement.style.setProperty(`${[...setStylesProperties][i]}`, i == 1 ? resizer_sizes[i] - 70 : resizer_sizes[i]);
                            }
                        }
                    }
                })


                document.addEventListener('mouseup', ()=>{
                    isDragging = false;
                    // AddORRemoveRisizer(resizerele);
                    // AddORRemoveRisizer(resizerele, true);
                    resizerele.style.cursor = 'move';
                    // resizer.removeEventListener('mousemove',(e)=> null);
                    // index = -1;
                });
                document.addEventListener('mouseleave', ()=>{
                    isDragging = false;
                    // AddORRemoveRisizer(resizerele);
                    // AddORRemoveRisizer(resizerele, true);
                    resizerele.style.cursor = 'move';
                    // resizer.removeEventListener('mousemove',(e)=> null);
                    // index = -1;
                })
            })

        })
    });
};