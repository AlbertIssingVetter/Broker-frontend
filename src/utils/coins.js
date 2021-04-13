import t from "../lang/t";
import BitcoinIcon from "../svg-icon/BitcoinIcon";
import EthereumIcon from "../svg-icon/EthereumIcon";
import TetherIcon from "../svg-icon/TetherIcon";
import LitecoinIcon from "../svg-icon/LitecoinIcon";
import CardanoIcon from "../svg-icon/CardanoIcon";
import BinanceIcon from "../svg-icon/BinanceIcon";
import DogeCoinIcon from "../svg-icon/DogeCoinIcon";
import TronIcon from "../svg-icon/TronIcon";
import RippleIcon from "../svg-icon/RippleIcon";
import BitcoinCashIcon from "../svg-icon/BitcoinCashIcon";
import EosioIcon from "../svg-icon/EosioIcon";
import PolkadotIcon from "../svg-icon/PolkadotIcon";
import VechainIcon from "../svg-icon/VechainIcon";
import ZilliqaIcon from "../svg-icon/ZilliqaIcon";
import StellarIcon from "../svg-icon/StellarIcon";
import DashIcon from "../svg-icon/DashIcon";
import UniswapIcon from "../svg-icon/UniswapIcon";
import EngineCoinIcon from "../svg-icon/EngineCoinIcon";
import MoneroIcon from "../svg-icon/MoneroIcon";
import WebMoneyIcon from "../svg-icon/WebMoneyIcon";
import SushiIcon from "../svg-icon/SushiIcon";

const coins = {
    btc: {
        name: t('bitcoin'),
        icon: <BitcoinIcon/>
    },
    eth: {
        name: t('ethereum'),
        icon: <EthereumIcon/>
    },
    usdt: {
        name: t('tether'),
        icon: <TetherIcon/>
    },
    ltc: {
        name: t('litecoin'),
        icon: <LitecoinIcon/>
    },
    ada: {
        name: t('cardano'),
        icon: <CardanoIcon/>
    },
    bnb: {
        name: t('binance'),
        icon: <BinanceIcon/>
    },
    doge: {
        name: t('dogeCoin'),
        icon: <DogeCoinIcon/>
    },
    etc: {
        name: t('ethereumClassic'),
        icon: <EthereumIcon/>
    },
    trx: {
        name: t('tron'),
        icon: <TronIcon/>
    },
    xrp: {
        name: t('ripple'),
        icon: <RippleIcon/>
    },
    bch: {
        name: t('bitcoinCash'),
        icon: <BitcoinCashIcon/>
    },
    eos: {
        name: t('eosio'),
        icon: <EosioIcon/>
    },
    dot: {
        name: t('polkadot'),
        icon: <PolkadotIcon/>
    },
    vet: {
        name: t('vechain'),
        icon: <VechainIcon/>
    },
    zil: {
        name: t('zilliqa'),
        icon: <ZilliqaIcon/>
    },
    xlm: {
        name: t('stellar'),
        icon: <StellarIcon/>
    },
    dash: {
        name: t('dash'),
        icon: <DashIcon/>
    },
    uni: {
        name: t('uniswap'),
        icon: <UniswapIcon/>
    },
    enj: {
        name: t('engineCoin'),
        icon: <EngineCoinIcon/>
    },
    xrm: {
        name: t('monero'),
        icon: <MoneroIcon/>
    },
    wm: {
        name: t('webmoney'),
        icon: <WebMoneyIcon/>
    },
    sushi: {
        name: t('sushi'),
        icon: <SushiIcon/>
    }
}


export default coins;
