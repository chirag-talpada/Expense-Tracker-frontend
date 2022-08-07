import _ from 'lodash'


export function getSum(transaction,type){
    let sum=_(transaction).groupBy("type").map((objs,key)=>{
        if(!type) return _.sumBy(objs,'amount')

        return {
            'type':key,
            'color':objs[0].color,
            'total':_.sumBy(objs,'amount')
        }


    }).value();

    return sum;
}

export function getLabels(transaction){
    let amountSum=getSum(transaction,"type");
    let Total=_.sum(getSum(transaction));

    let percent=_(amountSum).map(obj=>_.assign(obj,{percent:(100*obj.total)/Total})).value();
    return percent;  
}

export function chart_Data(transaction){
    
    let bg=_.map(transaction,a=>a.color);
    bg=_.uniq(bg);
    let dataValue=getSum(transaction);
    
    const config={
        data:{
            datasets: [{
                data: dataValue,
                backgroundColor: bg,
                hoverOffset: 4,
                borderRadius:30,
                spacing:3
            }]
        },
        options:{
            cutout:115 
        }
    }

    return config;
}

export function getTotal(transaction){
    return _.sum(getSum(transaction));
}