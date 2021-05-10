import t from "../lang/t";
import btc from '../coin-icon/btc.png';
import eth from '../coin-icon/eth.png';
import usdt from '../coin-icon/usdt.png';
import ltc from '../coin-icon/ltc.png';
import ada from '../coin-icon/ada.png';
import bnb from '../coin-icon/bnb.png';
import doge from '../coin-icon/doge.png';
import etc from '../coin-icon/etc.png';
import trx from '../coin-icon/trx.png';
import xrp from '../coin-icon/xrp.png';
import bch from '../coin-icon/bch.png';
import eos from '../coin-icon/eos.png';
import dot from '../coin-icon/dot.png';
import vet from '../coin-icon/vet.png';
import zil from '../coin-icon/zil.png';
import xlm from '../coin-icon/xlm.png';
import dash from '../coin-icon/dash.png';
import uni from '../coin-icon/uni.png';
import enj from '../coin-icon/enj.png';
import xmr from '../coin-icon/xmr.png';
import wm from '../coin-icon/wm.png';
import sushi from '../coin-icon/sushi.png';
import ali from '../coin-icon/ali.png';
import win from '../coin-icon/win.png';
import btt from '../coin-icon/btt.png';
import hot from '../coin-icon/hot.png';
import theta from '../coin-icon/theta.png';

const coins = {
    btc: {
        name: t('bitcoin'),
        icon: <img src={btc}/>
    },
    eth: {
        name: t('ethereum'),
        icon: <img src={eth}/>
    },
    usdt: {
        name: t('tether'),
        icon: <img src={usdt}/>
    },
    ltc: {
        name: t('litecoin'),
        icon: <img src={ltc}/>
    },
    ada: {
        name: t('cardano'),
        icon: <img src={ada}/>
    },
    bnb: {
        name: t('binance'),
        icon: <img src={bnb}/>
    },
    doge: {
        name: t('dogeCoin'),
        icon: <img src={doge}/>
    },
    etc: {
        name: t('ethereumClassic'),
        icon: <img src={etc}/>
    },
    trx: {
        name: t('tron'),
        icon: <img src={trx}/>
    },
    xrp: {
        name: t('ripple'),
        icon: <img src={xrp}/>
    },
    bch: {
        name: t('bitcoinCash'),
        icon: <img src={bch}/>
    },
    eos: {
        name: t('eosio'),
        icon: <img src={eos}/>
    },
    dot: {
        name: t('polkadot'),
        icon: <img src={dot}/>
    },
    vet: {
        name: t('vechain'),
        icon: <img src={vet}/>
    },
    zil: {
        name: t('zilliqa'),
        icon: <img src={zil}/>
    },
    xlm: {
        name: t('stellar'),
        icon: <img src={xlm}/>
    },
    dash: {
        name: t('dash'),
        icon: <img src={dash}/>
    },
    uni: {
        name: t('uniswap'),
        icon: <img src={uni}/>
    },
    enj: {
        name: t('engineCoin'),
        icon: <img src={enj}/>
    },
    xmr: {
        name: t('monero'),
        icon: <img src={xmr}/>
    },
    wm: {
        name: t('webmoney'),
        icon: <img src={wm}/>
    },
    sushi: {
        name: t('sushi'),
        icon: <img src={sushi}/>
    },
    ali: {
        name: t('alive'),
        icon: <img src={ali}/>
    },
    win: {
        name: t('wink'),
        icon: <img src={win}/>
    },
    btt: {
        name: t('bittorrent'),
        icon: <img src={btt}/>
    },
    hot: {
        name: t('holo'),
        icon: <img src={hot}/>
    },
    theta: {
        name: t('theta'),
        icon: <img src={theta}/>
    }
}


export default coins;
