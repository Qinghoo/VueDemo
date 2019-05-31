var obj = {}

obj.addlGoodListOne=function(itemId,counts){
    return {
        itemId:itemId,
        counts:counts
    };
}

obj.getCountsByItemId = function (addGoodList,itemId) {
    for (let index = 0; index < addGoodList.length; index++) {
        if (itemId == addGoodList[index].itemId) {
            return addGoodList[index].counts;
        }
    }
}
obj.getKeyByItemId =function(addGoodList,itemId){
    for (let index = 0; index < addGoodList.length; index++) {
        if (itemId == addGoodList[index].itemId) {
            return index;
        }
    }
}
obj.getKey2ByItemId =function(finalGoodList,itemId){
    for (let index = 0; index < finalGoodList.length; index++) {
        if (itemId == finalGoodList[index].itemId) {
            return index;
        }
    }
}
obj.finalGoodListOne=function(item,counts,isSelect){
    return {
        item:item,
        counts:counts,
        isSelect:isSelect
      };
}

export default obj