var obj = {}

obj.finalGoodListOne = function(item,counts,isSelect){
    return{
        item:item,
        counts:counts,
        isSelect:isSelect
    }
}

obj.getCountsByItemId = function (addGoodList,itemId){
    for (var i=0;i<addGoodList.length;i++){
        if(itemId == addGoodList[i].itemId){
            return addGoodList[i].counts;
        }
    }
}
obj.getFinalGoodSelect = function (finalGoodList,itemId){
    for(var i=0;i<=finalGoodList;i++){
        if(itemId == finalGoodList[i].itemId){
            return finalGoodList[i].isSelect;
        }
    }
}
export default obj