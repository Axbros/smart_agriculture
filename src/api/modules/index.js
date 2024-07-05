
import * as API from "../api";
import { getCurrentDate,xDaysAgo } from "@/utils/getToday";

export const paramType ={
    'insectInfo':'/insect_condition/insectStress',
    'climate_condition':"/climate_condition/daqishangqing", //用户总览
    'center':"/monitors/identifyingPhotos", //设备总览 
    'detect_solid':"/soilMoisture/today",
    'big2':"/bigscreen/countDeviceNum", //设备提醒
    'big4':"/bigscreen/alarmNum", //报警次数
    'big5':'/bigscreen/ssyj',//实时预警 
    'big6':'/bigscreen/installationPlan',// 安装计划
    'big7':'/bigscreen/ranking',// 报警排名
    'big8':'/bigscreen/centermap',// //中间地图

}

export const todayInspectInfo=()=>{
    return API.GET(paramType['insectInfo'])
}
export const todaySolidDetect=()=>{
    return API.GET(paramType['detect_solid'])
}
export const insectPressure=(days)=>{
    const params={
        startDate:xDaysAgo(days),
        days:days
    }
    return  API.GET(paramType['insectInfo'],params)
}

export const climate_condition=(type)=>{
    const params={
        type
    }
    return API.GET(paramType["climate_condition"],params)
}
export const centerRequest=()=>{
    return API.GET(paramType["center"])
}
/******************      通用增删改查       ********************* */
/**
 * 通用列表
 * @param {*} param 
 */
 export const currentList =  (key,param)=> {
    return API.GET(paramType[key]+"/list", param)
}
export const currentPage =  (key,param)=> {
    return API.GET(paramType[key]+"/page", param)
}
/**
 * 查询可选择的列表
 * @param {*} param 
 */
 export const currentSelectList=  (key,param)=> {
    return API.GET(paramType[key]+"/selectList", param)
}


/**
 * 通用新增
 * @param {*} param 
 */
 export const currentSave= (key,param)=> {
    return API.POST(paramType[key]+"/save", param)
}
/**
 * 通用修改
 * @param {*} param 
 */
 export const currentUpdate=  (key,param) => {
    return API.POST(paramType[key]+"/update", param)
}

/**
 * 通用删除
 * @param {*} param 
 */
 export const currentDelete= (key,param) => {
    return API.POST(paramType[key]+"/delete", param)
}

/**
 * 通用获取所有不分页
 * @param {*} param 
 */
 export const currentSelect=  (key,param)=> {
    return API.GET(paramType[key]+"/select", param)
}

/**
 * 通用GET
 * @param {*} param 
 */
 export const currentGET=  (key,param)=> {
    return API.GET(paramType[key], param)
}
/**
 * 通用POST
 * @param {*} param 
 */
 export const currentPOST=  (key,param)=> {
    return API.POST(paramType[key], param)
}
// 通用接口集合
export const currentApi={
    currentList,
    currentPage,
    currentSave,
    currentUpdate,
    currentDelete,
    currentSelect,
    currentSelectList,
    currentPOST,
    currentGET
}