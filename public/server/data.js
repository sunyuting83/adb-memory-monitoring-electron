const proc = require('child_process');
const binaryEncoding = 'binary';

// 首次先获取apk可启动的名称
// packageInfo
// 在启动apk
// startApp
// 再每次通过内存函数获取数据
// getMemory
// 如果出错。就再次循环执行
// 睡觉

class getData {
    constructor(props) {
        this.error = {
            'status': 500,
            'message': 'error'
        };
    }

    /**
     * init
     * @param {Object} params
     * cmder 命令名
     * driver 设备名
     * packages 包名
     * @return {Object} this.callbk 返回相应的结果 
     */
    init(params) {
        let {cmder,driver,packages} = params;
        this.cmder = cmder;
        if (driver) this.driver = driver;
        if (packages) this.package = packages;
        this.getCmder();
        // console.log(`cmder is : ${this.cmder}`);
        this.CmdER();
        let err = this.data.indexOf('error');
        if (err === -1) {
            this.makeData();
            // console.log(`return is : ${this.callbk}`);
            return this.callbk;
        }else {
            return this.error;
        }
    }

    /**
     * getCmder 获取当前系统命令
     * @param {String} this.cmder
     * @return {Object} set this.cmder & this.fun 
     */
    getCmder() {
        // console.log(this.driver);
        switch (this.cmder) {
            case 'all':
                this.cmder = 'adb devices';
                this.fun = 'all';
                break;
            case 'driver':
                this.cmder = `adb -s ${this.driver} shell pm list package -3`;
                this.fun = 'driver';
                break;
            case 'package':
                this.cmder = `adb -s ${this.driver} shell dumpsys package ${this.package}`;
                this.fun = 'package';
                break;
            case 'startapp':
                this.cmder = `adb -s ${this.driver} shell am start -n ${this.packageinfo}`;
                this.fun = 'startapp';
                break;
            case 'getVersion':
                this.cmder = `adb -s ${this.driver} shell getprop ro.build.version.sdk`;
                this.fun = 'getVersion';
                break;
            case 'getmemory':
                this.cmder = `adb -s ${this.driver} shell dumpsys meminfo ${this.package}`;
                this.fun = 'getmemory';
                break;
            default:
                this.cmder = 'adb devices';
                break;
        }
    }

    /**
     * makeData 执行数据处理
     * @param {String} this.fun
     * @return {Function} put the some function
     */
    makeData() {
        switch (this.fun) {
            case 'all':
                this.getDriver();
                break;
            case 'driver':
                this.getAllApk();
                break;
            case 'package':
                this.packageInfo();
                break;
            case 'getVersion':
                this.getVersion();
                break;
            case 'startapp':
                this.startApp();
                break;
            case 'getmemory':
                this.getMemory();
                break;
            default:
                this.getDriver();
                break;
        }
    }

    /**
     * getDriver 处理当前设备数据
     * @param {Object} this.data
     * @return {Object} 当前连接的设备列表
     */
    getDriver () {
        let data = this.data;
        data = data.split('\n');
        let lin = data.findIndex((x) => x.indexOf('List of devices') !== -1);
        data = data.filter((x, i) => x !== '' && i > lin);
        for (const i in data) {
            if (data.hasOwnProperty(i)) {
                let element = data[i];
                data[i] = element.split('\t')[0]
            }
        };
        if (data.length <= 0) {
            this.error.message = '没有连接的设备';
            this.callbk = this.error;
        }else {
            this.callbk = {
                status: 200,
                devices: data
            };
        }
    }

    /**
     * getAllApk 处理当前设备第三方应用包数据
     * @param {Object} this.data
     * @return {Object} 当前连接的设备里第三方应用包列表
     */
    getAllApk () {
        let data = this.data;
        data = data.replace(/[\t\f\r]/g, '');
        data = data.split('\n');
        data = data.filter((x) => x !== '');
        for (let i in data) {
            if (data.hasOwnProperty(i)) {
                let pack = data[i];
                data[i] = pack.split(':')[1];
            }
        }
        this.callbk = {
            status: 200,
            package: data
        };
    }

    getMemory () {
        let data = this.data;
        let err = data.indexOf('No process found');
        if(err === -1) {
            data = data.replace(/[\t\f\r]/g, '');
            data = data.split('\n');
            let cdata = this.makeMemoryData(data);
            this.callbk = cdata;
        }else {
            this.error.message = data;
            this.callbk = this.error;
        }
    }

    makeMemoryData(data) {
        // console.log(data);
        let Uptime = new Date(),
            Realtime = new Date(),
            Native = 0,
            Java = 0,
            Stack = 0,
            Code = 0,
            Graphics = 0,
            Other = 0,
            System = 0,
            Total = 0;
        Uptime = this.makeTime(data)[0];
        Realtime = this.makeTime(data)[1];
        if (this.apiversion >= 23) {
            Native = this.getNumber(data, 'Native Heap:');
            Java = this.getNumber(data, 'Java Heap:');
            Stack = this.getNumber(data, 'Stack:');
            Code = this.getNumber(data, 'Code:');
            Graphics = this.getNumber(data, 'Graphics:');
            Other = this.getNumber(data, 'Private Other:');
            System = this.getNumber(data, 'System:');
            Total = this.makeTotal(data);
        }else {
            Native = this.getNumbers(data, 'Native Heap');
            Java = this.getNumbers(data, 'Dalvik Heap') + this.getNumbers(data, 'Dalvik Other');
            Stack = this.getNumbers(data, 'Stack');
            Code = this.getNumbers(data, '.dex mmap') + this.getNumbers(data, '.so mmap');
            Other = this.getNumbers(data, 'Other mmap');
            System = this.getNumbers(data, 'Unknown');
            Total = this.getNumbers(data, 'TOTAL');
        }
        return {
            status: 200,
            memory: {
                Uptime: Uptime,
                Realtime: Realtime,
                Native: Native,
                Java: Java,
                Stack: Stack,
                Code: Code,
                Graphics: Graphics,
                Other: Other,
                System: System,
                Total: Total
            }
        };
    }

    getNumbers(str, name) {
        str = str.filter((x) => x.indexOf(name) !== -1);
        if (str[0] !== undefined)
        str = str[0].split('    ');
        str = str.filter((x) => x !== '');
        str = str[1].replace(/(^\s+)|(\s+$)/g, "");
        str = parseInt(str);
        return str;
    }

    getNumber(str, name) {
        str = str.filter((x) => x.indexOf(name) !== -1);
        str = str[0].split(':')[1];
        str = str.replace(/(^\s+)|(\s+$)/g, "");
        str = parseInt(str);
        return str;
    }
    makeTotal(str) {
        str = str.filter((x) => x.indexOf('TOTAL:') !== -1)[0].split(':')[1].split(' ');
        str = str.filter((x) => x !== '');
        str = parseInt(str[0]);
        return str;
    }
    makeTime(str) {
        str = str.filter((x) => x.indexOf('Uptime') !== -1)[0].split(' ');
        let uptime = this.changeDate(parseInt(str[1]));
        let retime = this.changeDate(parseInt(str[3]));
        return [uptime, retime];
    }

    changeDate(t){
        var date = new Date(t);
        // console.log(date);
        let m = date.getMinutes();
        let s = date.getSeconds();
        return `${m}:${s}`
    }

    startApp() {
        this.callbk = {
            status: 200,
            packageinfo: this.packageinfo
        };
    }

    packageInfo() {
        let data = this.data;
        data = data.replace(/[\t\f\r]/g, '');
        data = data.split('\n');
        data = data.filter((x) => x !== '');
        let x;
        data.forEach((d,i) => {
            if (d.indexOf('android.intent.action.MAIN:') !== -1) x = i;
        });
        x = x+1;
        data = data[x];
        // 
        data = data.split(' ').filter((d) => d !== '')[1];
        // console.log(data);
        this.packageinfo = data;
        this.init({cmder:'getVersion'});
        // this.cmder = 'startapp';
        // this.init({cmder:'startapp'});
    }
    getVersion() {
        this.apiversion = parseInt(this.data);
        this.init({cmder:'startapp'});
    }

    CmdER() {
        // console.log(this.cmder);
        try {
            let data = proc.execSync(this.cmder, {
                encoding: binaryEncoding
            });
            // console.log(data);
            this.data = data;
        } catch (error) {
            // console.log(error.stderr);
            this.data = error.stderr;
        }
    }
}
/**
 * @Params Object {cmder,driver,package}
 * cmder :
 *   null获取全部设备 
 *   driver获取所选设备第三方应用包
 *   package获取应用Active并打开应用
 *   getmemory获取应用内存使用情况
 * driver :由前端发送设备名称
 * package:前端发送应用包名
 */
var person = new getData();

// let parms = {
//     cmder: 'getmemory',
//     driver: 'Coolpad8675-0xb9ffe40e',
//     packages: 'com.meitu'
// };
// console.log(person.init(parms));

exports.person = person;