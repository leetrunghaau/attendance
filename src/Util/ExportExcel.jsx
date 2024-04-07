import XLSX from 'xlsx-js-style';
export const CellStyle = {
    TIEUDE:{font: { bold: true, color: { rgb: "000000" } },alignment: { horizontal:'center' ,vertical:'center' } },
    ALIGN:{
            H_CENTER:{alignment: {horizontal:'center' } },
            V_CENTER:{alignment: {vertical:'center' } },
            RIGHT:{alignment: {horizontal:'right' } }
            },
    BOLD:{font: { bold: true}},
    WRAP:{alignment: { wrapText: true } },
    BG_COLOR:(color)=>{return{fill: { type: "pattern", pattern: "solid", fgColor: { rgb: color } } }},
    HEADER_COLUMN:{font: { bold: true, color: { rgb: "000000" }} ,alignment: {wrapText:true, horizontal:'center' ,vertical:'center' }},
    BORDER:{border: { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } }}, 
    FONTSIZE:(size)=>{return{font: { sz: size } }}       
};

const getHeaderAtLevel=(data,level,kq)=>{
    data.forEach(element => {
        if(element.level==level)
        {
            let temp={
                v:element.title,s: { ...CellStyle.HEADER_COLUMN, ...CellStyle.BORDER } 
            }
            kq.push(temp)
            for (let col = 1; col < element.mergeCol; col++) {
                kq.push({v:"",s: { ...CellStyle.HEADER_COLUMN, ...CellStyle.BORDER } });
            }
        }
        else if(element.level<level && element.children)
            getHeaderAtLevel(element.children,level,kq);
        else
            kq.push({v:"",s: { ...CellStyle.HEADER_COLUMN, ...CellStyle.BORDER } });
    });
}
const mergeRowCol=(data,rowStart,colStart,kq,parentIndex,maxLevel)=>{
    let startIndex=colStart+parentIndex;
    let endIndex=0;
    let maxLevelChild=data.reduce((a,b)=>a.maxLevelChild>b.maxLevelChild?a:b).maxLevelChild;     

    data.forEach((element,index) => {
        endIndex=startIndex+element.mergeCol;
        //Merger Col
        if(element.mergeCol>1)
        {
            let temp= { s: { r: rowStart + element.level-1, c: startIndex },
                    e: { r: rowStart + element.level-1, c: endIndex-1 } }
            kq.push(temp);
        }
        //Merge Row
        if(element.maxLevelChild<maxLevelChild && !element.children)
        {
            let temp= { s: { r: rowStart + element.level-1, c: startIndex },
            e: { r: rowStart + element.level-1 + maxLevelChild-element.maxLevelChild , c:startIndex } }
            kq.push(temp);
        }
        else if(element.maxLevelChild==0 && !element.children && element.level<maxLevel)
        {
            let temp= { s: { r: rowStart + element.level-1, c: startIndex },
            e: { r: rowStart + element.level-1 + maxLevel-element.level , c:startIndex } }
            kq.push(temp);
            console.log("mergeRow==>",temp);
        }
        if(element.children)
            mergeRowCol(element.children,rowStart,colStart,kq,startIndex,maxLevel);
        startIndex=endIndex;
    });
}

/** Cú pháp columns như sau 
 * [{
    "title": "Title",
    "level": 1,
    "mergeCol": 6,
    "maxLevelChild": 1
    "children": [
        {
            "title": "Title",
            "level": 2,
            "mergeCol": 1,
            "maxLevelChild": 0
        }
    ],   
}] */
export const GetHeaderFromAntTableColumn=(antColumns,maxLevel)=>{
    var result=[];
    for (let index = 0; index < maxLevel; index++) {
        var kq=[];
        getHeaderAtLevel(antColumns,index+1,kq)
        result.push(kq);
    }
    return result;
}
/** Cú pháp columns như sau 
 * [{
    "title": "Title",
    "level": 1,
    "mergeCol": 6,
    "maxLevelChild": 1
    "children": [
        {
            "title": "Title",
            "level": 2,
            "mergeCol": 1,
            "maxLevelChild": 0
        }
    ],   
}] */
export const GetMergeHeaderFromAntTableColumn=(antColumns,rowStart,colStart,maxLevel)=>{
    var result=[];
    mergeRowCol(antColumns, rowStart,colStart,result,0,maxLevel)
    return result;
}
export const GetMergeTitle=(antColumns,rowStart,colStart)=>{
    var result=[];
    var columns=antColumns.reduce((acc, obj) => acc + obj.mergeCol, 0);
    result.push({ s: { r: rowStart, c: colStart },
            e: { r: rowStart , c:colStart+columns-1 } })
    return result;
}
export const GetWidthColumn=(antColumns,width,startAt)=>{
    var result=[];
    var columns=antColumns.reduce((acc, obj) => acc + obj.mergeCol, 0);
    for (let index = startAt; index < columns; index++) {
        result.push(
                {wch:width}
        );       
    }
    return result;
}

export const ExportExcel=(data,fileName)=>{
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([]);
    data.title&& XLSX.utils.sheet_add_aoa(worksheet, data.title.data, data.title.format);
    data.header&&XLSX.utils.sheet_add_aoa(worksheet, data.header.data, data.header.format);
    data.data&&XLSX.utils.sheet_add_aoa(worksheet, data.data.data, data.data.format);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    data.merge&&(worksheet["!merges"] = data.merge);  
    data.cols&&(worksheet['!cols'] =data.cols);
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
}