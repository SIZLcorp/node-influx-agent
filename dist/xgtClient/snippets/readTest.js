"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const xgtClient = __1.XGTClient.getInstance({
    port: 2004,
    host: '192.168.100.110'
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const total_count = yield xgtClient.readData('C12', 'B');
        const press_acc_count = yield xgtClient.readData('C10', 'B');
        const preset_count = yield xgtClient.readData('D4020', 'B');
        const ready_status = yield xgtClient.readData('M60', 'B');
        console.log({
            total_count,
            press_acc_count,
            preset_count,
            ready_status
        });
    });
}
run();
//# sourceMappingURL=readTest.js.map