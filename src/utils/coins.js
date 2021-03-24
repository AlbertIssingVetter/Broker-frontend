import t from "../lang/t";
import BitcoinIcon from "../svg-icon/BitcoinIcon";
import EthereumIcon from "../svg-icon/EthereumIcon";
import TetherIcon from "../svg-icon/TetherIcon";
import LitecoinIcon from "../svg-icon/LitecoinIcon";

const coins = {
    btc: {
        name: t('bitcoin'),
        id: 'btc',
        icon: <BitcoinIcon/>
    },
    eth: {
        name: t('ethereum'),
        id: 'eth',
        icon: <EthereumIcon/>
    },
    usdt: {
        name: t('tether'),
        id: 'usdt',
        icon: <TetherIcon/>
    },
    ltc: {
        name: t('litecoin'),
        id: 'ltc',
        icon: <LitecoinIcon/>
    },
}


export default coins;
