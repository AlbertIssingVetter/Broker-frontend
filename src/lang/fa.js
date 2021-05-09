import {Typography} from "@material-ui/core";
import React from "react";

const fa =  {
    appName: 'Trust Market',
    loginWelcome: 'خوش آمدید، لطفا به حساب خود وارد شوید.',
    username: 'نام کاربری',
    password: 'گذرواژه',
    rememberMe: 'من را به خاطر بسپار',
    forgetPassword: 'بازیابی کلمه عبور',
    login: 'ورود',
    signup: 'ایجاد حساب',
    signupHeader: 'لطفا برای ایجاد حساب اطلاعات زیر را کامل فرمایید.',
    mail: 'ایمیل',
    mobile: 'شماره موبایل',
    agreeWithTerms: 'قوانین و شرایط تراست مارکت را مطالعه کردم و می پذیرم',
    alreadyHaveAccount: 'قبلا اکانت ساخته اید؟ وارد شوید.',
    usernameValidationError: 'نام کاربری باید حداقل ۳ حرف باشد.',
    mailValidationError: 'ایمیل معتبر نمی باشد.',
    mobileValidationError: 'شماره موبایل معتبر نمی باشد.',
    passwordValidationErrorLength: 'حداقل ۸ حرف باشد',
    passwordValidationErrorLowercase: 'حداقل یک حرف کوچک داشته باشد',
    passwordValidationErrorUppercase: 'حداقل یک حرف برزگ داشته باشد',
    passwordValidationErrorNumber: 'حداقل یک عدد داشته باشد',
    ok: 'باشه',
    error: 'خطای کد {0}',
    validationError: 'خطای اعتبار سنجی کادرها',
    signupError: 'لطفا تمام کادرها رو بطور صحیح وارد کنید.',
    fixSignupError: 'لطفا کادرهای زیر را بطور صحیح وارد کنید:',
    home: 'خانه',
    profile: 'پروفایل',
    price: '{0} تومان',
    bitcoin: 'بیتکوین',
    ethereum: 'اتریوم',
    tether: 'تتر',
    logout: 'خروج',
    firstName: 'نام',
    lastName: 'نام خانوادگی',
    nationalCode: 'کد ملی',
    save: 'ذخیره',
    financialInformation: 'اطلاعات بانکی',
    furtherInformation: 'اطلاعات تکمیلی',
    tel: 'تلفن ثابت',
    bank: 'بانک',
    cardNumber: 'شماره کارت',
    operation: 'عملیات',
    status: 'وضعیت',
    noItem: 'هیچ موردی یافت نشد.',
    add: 'افزودن',
    bankAccount: 'حساب بانکی',
    mailVerificationDialogTitle: 'ایمیل خود را تایید کنید',
    mailVerificationDialogContent: 'آدرس ایمیل شما هنوز تایید نشده است، شما برای دسترسی های بیشتر می بایست ایمیل خود را تایید کنید.',
    later: 'بعداً',
    sendCode: 'ارسال کد',
    mobileVerificationDialogTitle: 'شماره موبایل خود را تایید کنید',
    mobileVerificationDialogContent: 'شماره موبایل شما هنوز تایید نشده است، شما برای دسترسی های بیشتر می بایست شماره موبایل خود را تایید کنید.',
    mobileCodeDialogTitle: 'شماره موبایل خود را تایید کنید',
    mobileCodeDialogContent: 'یک کد به شماره موبایل شما پیامک شده است، لطفا آن را وارد کنید.',
    code: 'کد',
    verify: 'تایید',
    mailCodeDialogTitle: 'ایمیل خود را تایید کنید',
    mailCodeDialogContent: 'یک کد به آدرس ایمیل شما ارسال شده است، لطفا آن را وارد کنید.',
    profileEditedSuccessfully: 'پروفایل شما با موفقیت بروز رسانی شد.',
    furtherInformationEditedSuccessfully: 'اطلاعات تکمیلی شما با موفقیت بروز رسانی شد.',
    nationalCardVerificationDialogTitle: 'اطلاعات کارت ملی خود را تایید کنید.',
    nationalCardVerificationDialogContent: 'نام و نام خانوادگی و کد ملی شما هنوز تایید نشده است، لطفا یک عکس شفاف از کارت ملی خود ارسال کنید.',
    sendImage: 'ارسال عکس',
    selectFile: 'انتخاب فایل یا رها کردن آن در اینجا',
    selectFileAuto: 'فایل را انتخاب کنید یا آن را اینجا رها کنید تا بصورت اتوماتیک ارسال شود',
    selectedFiles: '{0} فایل انتخاب شده است.',
    accountNumber: 'شماره شبا',
    addCardDialogTitle: 'افزودن حساب بانکی',
    addCardDialogContent: 'شما باید شماره کارت و شبا یک حساب بانکی را بدون هیچ \'-\' یا فاصله ای وارد کنید.',
    cardAddedSuccessfully: 'اطلاعات حساب بانکی شما با موفقیت افزوده شد.',
    verified: 'تایید شده',
    waitingForVerification: 'در انتظار تایید',
    notVerified: 'هنوز تایید نشده',
    zipCode: 'کد پستی',
    identityConfirmation: 'تایید هویت',
    telephoneVerificationDialogTitle: 'شماره تلفن ثابت خود را تایید کنید',
    telephoneVerificationDialogContent: 'شماره تلفن ثابت شما هنوز تایید نشده است، شما برای دسترسی های بیشتر می بایست تلفن خود را تایید کنید.',
    telephoneCodeDialogTitle: 'شماره تلفن ثابت خود را تایید کنید',
    telephoneCodeDialogContent: 'با شما تماس گرفته و کدی برای شما خوانده می شود، لطفا کد دریافتی را اینجا وارد کنید.',
    uploadIdentityPicture: 'انتخاب عکس',
    identityConfirmationDialogTitle: 'تایید هویت',
    identityConfirmationDialogContent: 'لطفاً یک عکس شفاف مانند عکس زیر وارد کنید:',
    address: 'آدرس',
    date: 'تاریخ',
    forgetPasswordHeader: 'لطفا ایمیل خود را وارد کنید تا کدی که با آن کلمه عبور خود را تغییر میدهید برایتان ارسال شود.',
    back: 'بازگشت',
    passwordErrorTitle: 'خطا در کلمه عبور',
    passwordErrorContent: 'لطفا یک کلمه عبور صحیح با شرایط زیر وارد کنید:',
    changePassword: 'تغییر کلمه عبور',
    forgetPasswordCodeHeader: 'برای شما ایمیلی حاوی یک کد برای تغییر کلمه عبورتان ارسال شد.',
    passwordChangedSuccessfullyTitle: 'کلمه عبور با موفقیت تغییر کرد',
    passwordChangedSuccessfullyContent: 'شما هم اکنون میتوانید با کلمه عبور جدید خود وارد شود.',
    currentPassword: 'گذرواژه فعلی',
    newPassword: 'گذرواژه جدید',
    change: 'تغییر',
    toggleDarkModeTheme: 'تغییر وضعیت تم روشن/تیره',
    addCardNumberDialogTitle: 'افزودن شماره کارت',
    addCardNumberDialogContent: 'لطفا شماره ۱۶ رقمی کارت بانکی که به نام خود شما می باشد را وارد نمایید.',
    bankCards: 'کارت های بانکی',
    bankShabas: 'حساب های بانکی',
    addAccountNumberDialogTitle: 'افزودن شبا',
    addAccountNumberDialogContent: 'لطفا شبای حساب بانکی که به نام خود شما می باشد را وارد نمایید.',
    litecoin: 'لایت کوین',
    toman: 'تومان',
    myWallet: 'کیف من',
    deposit: 'واریز',
    withdraw: 'برداشت',
    update: 'بروز رسانی',
    market: 'بازار',
    withdrawRequest: 'درخواست برداشت',
    withdrawDescription: 'در صورت تمایل به برداشت موجودی کیف پول‌های خود، درخواست خود را اینجا ثبت نمایید.',
    tutorialVideo: 'راهنمای تصویری',
    withdrawCount: 'مبلغ برداشت ({0}):',
    yourActiveBalance: 'موجودی قابل برداشت شما :',
    select: 'انتخاب',
    destinationWalletAddress: 'آدرس کیف پول مقصد :',
    destinationWalletAddressWarningMessage: 'توجه: وارد کردن آدرس نادرست ممکن است منجر به از دست رفتن منابع مالی شما شود.',
    withdrawFee: 'کارمزد انتقال :',
    withdrawFeeInfoMessage: 'کارمزد انتقال مربوط به ثبت تراکنش در شبکه‌ی کوین بوده و تراست مارکت در آن ذینفع نیست.',
    withdrawInfoMessage: 'در صورتی که آدرس مقصد متعلق به کاربران تراست مارکت بوده و توسط تراست مارکت مدیریت شود، انتقال به صورت مستقیم و سریع صورت می‌گیرد و کارمزد انتقال صفر خواهد بود.',
    createWithdrawRequest: 'ایجاد درخواست برداشت',
    seeFees: 'مشاهده کارمزد ها',
    walletOf: 'کیف پول {0}',
    yourBalance: 'موجودی شما : {0} {1}',
    depositDescription: 'آدرس این کیف پول شما در کادر زیر قابل مشاهده است. برای واریز ارزهای دیجیتال به این کیف، می‌توانید از این آدرس استفاده کنید.',
    depositHistory: 'تاریخچه واریز ها',
    withdrawHistory: 'تاریخچه برداشت ها',
    description: 'توضیحات',
    transactionVolume: 'حجم تراکنش',
    setting: 'تنظیمات',
    changeLanguage: 'تغییر زبان',
    retry: 'تلاش مجدد',
    networkErrorTitle: 'خطا در اتصال به سرور',
    networkErrorDescription: 'لطفا دسترسی خود به اینترنت را بررسی سپس دوباره تلاش کنید.',
    changeTheme: 'تغییر تم',
    installApp: 'نصب نرم افزار',
    installAndroidTitle: 'نصب نرم افزار اندروید',
    installAndroidDescription: 'برای نصب نرم افزار اندروید لطفا ابتدا نرم افزار را از یکی از روش های زیر دانلود فرمایید.',
    iosInstallationGuide: 'آموزش نصب نرم افزار روی IOS',
    iosInstallationGuideFirst: 'ابتدا در نوار پایین روی دکمه "share" کلیک کنید. (در ایپد بالا سمت راست)',
    iosInstallationGuideSecond: 'منوی باز شده را به بالا بکشید و روی دکمه "Add to Home Screen" کلیک کنید. (در نسخه های قدیمی تر IOS به چپ)',
    iosInstallationGuideThird: 'سپس در قسمت بالا روی "Add" کلیک کنید.',
    directDownload: 'دانلود مستقیم',
    notIOSDevice: 'میبایست با سیستم عامل IOS وارد شوید.',
    createWalletDescription: ' برای واریز کوین به کیف خود، با زدن دکمه‌ی زیر یک آدرس والت برای خود ایجاد نمایید: ',
    createWallet: 'ایجاد آدرس والت',
    cardano: 'کاردانو',
    binance: 'بایننس',
    dogeCoin: 'دوج کوین',
    ethereumClassic: 'اترویم کلاسیک',
    tron: 'ترون',
    ripple: 'ریپل',
    bitcoinCash: 'بیتکوین کش',
    eosio: 'ایاس',
    polkadot: 'پولکادات',
    vechain: 'ویچین',
    zilliqa: 'زیلیکا',
    stellar: 'استلار',
    dash: 'دش',
    uniswap: 'یونی سواپ',
    engineCoin: 'انجین کوین',
    monero: 'مونرو',
    webmoney: 'وب مانی',
    sushi: 'سوشی',
    unknownError: 'خطای ناشناخته ای رخ داده است لطفا مجدد تلاش کنید.',
    acceleratedDeposit: 'واریز شتابی',
    irrWarningDeposit: 'لطفا پیش از واریز وجه، توضیحات زیر را به دقت مطالعه نمایید. مسئولیت مشکلات ناشی از عدم توجه به این موارد بر عهده‌ی مشتری خواهد بود.',
    irrDepositTitleText: 'جهت افزایش اعتبار کیف پول ریالی خود با استفاده از کارت‌های بانکی عضو شبکه شتاب و از طریق درگاه پرداخت اینترنتی اقدام نمایید.',
    irrDepositHintList: (
        <>
            <Typography>
                در هنگام پرداخت به نکات زیر دقت نمایید:
            </Typography>
            <ul>
                <li>حتماً به آدرس صفحه‌ی درگاه بانکی دقت نموده و تنها پس از اطمینان از حضور در سایت‌های سامانه‌ی شاپرک مشخصات کارت بانکی خود را وارد نمایید.</li>
                <li>در صفحه درگاه دقت کنید که حتما مبلغ نمایش داده شده درست باشد.</li>
                <li>در تعیین مبلغ واریز به این موضوع دقت نمایید که حداقل مبلغ معامله در بازار تراست مارکت صد هزار تومان است.</li>
                <li>جهت واریز وجه، حتما باید از کارت‌های بانکی به نام خودتان که در پروفایل‌تان ثبت و تایید شده است، استفاده نمایید.</li>
            </ul>
        </>
    ),
    bankCard: 'کارت بانکی',
    addCardNumber: 'افزودن کارت',
    depositAmountAtToman: 'مبلغ واریزی به تومان',
    transferToBank: 'انتقال به درگاه پرداخت',
    selectACardNumber: 'لطفا شماره کارت بانکی که قصد دارید با آن پرداخت انجام دهید را انتخاب کنید. ',
    minIRRDeposit: 'مبلغ وارد شده شما کمتر از {0} تومان که حداقل میزان واریز ریالی می باشد، است.',
    maxIRRDeposit: 'مبلغ وارد شده شما بیش از {0} تومان که حداکثر میزان واریز ریالی می باشد، است.',
    alive: 'alive',
    irrTransactionsStatus1: 'پرداخت انجام نشده است',
    irrTransactionsStatus2: 'پرداخت ناموفق بوده است',
    irrTransactionsStatus3: 'خطا رخ داده است',
    irrTransactionsStatus4: 'بلوکه شده',
    irrTransactionsStatus5: 'برگشت به پرداخت کننده',
    irrTransactionsStatus6: 'برگشت خورده سیستمی',
    irrTransactionsStatus7: 'انصراف از پرداخت',
    irrTransactionsStatus8: 'به درگاه پرداخت منتقل شد',
    irrTransactionsStatus10: 'در انتظار تایید پرداخت',
    irrTransactionsStatus100: 'پرداخت تایید شده است',
    irrTransactionsStatus101: 'پرداخت قبلا تایید شده است',
    irrTransactionsStatus200: 'به دریافت کننده واریز شد',
    acceptAndBack: 'تایید و بازگشت',
    yourTrackCode: 'کد پیگیری شما {0}',
    irrDepositSuccessDescription: 'پرداخت شما با موفقیت انجام شد برای تایید نهایی و بازگشت روی دکمه زیر کلیک کنید.',
    paymentWaiting: 'درانتظار تایید',
    paymentError: 'تراکنش ناموفق',
    paymentSuccess: 'تایید شده',
    lastPrice: 'آخرین قیمت',
    minPrice: 'حداقل قیمت',
    maxPrice: 'حداکثر قیمت',
    turnover: 'حجم روزانه',
    compareToYesterday: 'نسبت به دیروز %{0}',
    sell: 'فروش',
    buy: 'خرید',
    bestOffer: 'بهترین پیشنهاد: {0} {1}',
    openOffer: 'سفارشات باز',
    totalPrice: 'مبلغ کل',
    coinAmount: 'مقدار ارز',
    unitPrice: 'قیمت واحد',
    coin: 'ارز',
    actions: 'اقدامات',
    filled: 'پر شده',
    openOfferSuccessfullyDelete: 'پیشنهاد شما با موفقیت حذف شد',
    addOfferSuccessfully: 'پیشنهاد شما با موفقیت ثبت شد.',
    yourReceipt: 'دریافتی شما:  {0} {1}',
    moreThanYourBalance: 'مقدار وارد شده بیشتر از موجودی شما می باشد.',
    time: 'ساعت',
    history: 'تاریخچه',
    averagePrice: 'میانگین قیمت تمام شده',
    amount: 'مقدار',
    fee: 'کارمزد',
    type: 'نوع',
    cancelled: 'کنسل شده',
    waiting: 'در حال معامله',
    finished: 'تمام شده',
    rowsPerPage: 'تعداد رکورد در صفحه',
    labelDisplayedRows: '{0}-{1} از {2}',
    all: 'همه',
    moreThanMax: 'بیشتر از ماکسیمم مقدار معامله',
    lessThanMin: 'کمتر از مینیمم مقدار معامله',
    yourWallet: 'کیف شما',
    accountStatus: 'وضعیت حساب کاربری',
    accountLevel: 'سطح کاربری',
    dailyIRRWithdraw: 'برداشت روزانه ریال',
    dailyCoinWithdraw: 'برداشت روزانه رمزارز',
    dailyTotalWithdraw: 'مجموع برداشت روزانه',
    monthWithdraw: 'مجموع برداشت ماهانه',
    xFromMaxWithdraw: '{0} از {1} تومان',
    yourEstimateAsset: 'تخمین دارایی شما: {0}',
    calculatedFee: 'کارمزد: {0} {1}',
    yourLastTransactions: 'معاملات اخیر شما',
    volume: 'حجم',
}

export default fa;
