import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 1. ROBOTS (Catálogo Completo)
const ROBOTS_DATA = [
    'ROBOT SEGUIDOR DE LUZ',
    'ROBOT SLIDER',
    'ROBOT BEE',
    'ROBOT MONQUEI',
    'ROBOT KLIMBOT',
    'ROBOT SEGUIDOR DE LINEA',
    'ROBOT EVASOR',
    'FALLA EN SOBRE',
    'ROBOT SOCCER',
    'ROBOT MINISUMO',
    'ROBOT ARAÑA - Essential',
    'ROBOT MOBE - Essential',
    'ROBOT ROBOZUP - Essential',
    'PROYECTOS STEAM I',
    'ROBOT LABERINTO',
    'PROYECTOS STEAM II',
    'NO ASIGNADO',
    'PROFE',
    'M4RK Robot® Brazo Robótico',
    'Proyectos IoT Robotización',
    'Scooter – Essential',
    'Evaser - Essential'
]

// 2. CODIGOS VEX (Pools)
const VEX_PREMIUM = [
    'CTCQHE', 'QPGWRN', 'MRWAGF', 'UEJXXZ', 'UVFWTV', 'EBNDHF', 'RAWADC', 'PPAUCT'
] // 50 Usos c/u

// Pool ÚNICO y COMPLETO de Básicos (Se usará también para Essential)
const VEX_BASIC = [
    'UAMFEM', 'RTRKRV', 'XEHNWB', 'CYCMJV', 'CGYGBC', 'CYFCRC', 'FGBXEA', 'FWJEUD', 'DVFRKK', 'YPTQNR',
    'NAKUNK', 'JDRQJB', 'FEVVZU', 'YNXQXN', 'NVEJHG', 'WZVYDW', 'QFECEY', 'EABNNN', 'FKHEND', 'UXVHZC',
    'HXAAKX', 'ZTKCXC', 'NPQMME', 'XEFPQX', 'RGYAJA', 'HQXDGD', 'JAACPB', 'JJBEAA', 'DNKQCF', 'HMVGBV',
    'EBZRTK', 'JAGTXM', 'QDFQMK', 'GCAKXV', 'EDMZAM', 'ACWVEK', 'DZBRTB', 'RBFTEE', 'CPKQNC', 'ERKVZA',
    'VJAEJP', 'FMUEWT', 'YGAJEG', 'DFWPDR', 'PFGQED', 'VRHNMC', 'XZNUFZ', 'VZRUUH', 'AHACHQ', 'FPGRWR',
    'VRVTUM', 'ERTDUD', 'NKCGXX', 'WQHCGE', 'XMEMHP', 'TMFNEX', 'GPYHHU', 'JFUJRB', 'BDVTGC', 'VQJUYK',
    'TNUBUM', 'ZMNVYC', 'QBGWBH', 'GVYBXY', 'AQEBCJ', 'ARMYTJ', 'YTEGTN', 'BCVCTK', 'TVYKDR', 'UEYGNP',
    'AMJAKJ', 'UDVCZJ', 'HFCHMM', 'PRAKRA', 'BJAGTF', 'EUQBRG', 'TJNNPR', 'JWPPZP', 'MRWFMH', 'NBQFUQ',
    'TDYHAH', 'JZZHVN', 'GNHQUT', 'RYAQZJ', 'MVUNQN', 'FHFHUT', 'NRJVKV', 'GMPGHP', 'WUHKAX', 'TZUEYQ',
    'KKZRZW', 'BXRCJV', 'FVFYVW', 'QYWKGZ', 'HBXTTQ', 'EXXHPW', 'RVXZPZ', 'CTDECB', 'RTZAFK', 'HFQBJG',
    'MMDDYP', 'TCPJYN', 'TZTZJV', 'NXAVFZ', 'PFMUHJ', 'TVRHJX', 'MWEZQP', 'BDPFZD', 'NGBGCA', 'KGURRK',
    'HBZWHA', 'WEWBWU', 'NKUCUU', 'QBYCNW', 'FWTGZH', 'KXPDHK', 'KZNJCA', 'ANYUYH', 'HAXBHF', 'TFDXKX',
    'BJWYCE', 'PJUKJT', 'TQHDNE', 'NPJRVM', 'VUANKA', 'NHKFRK', 'QVUTNG', 'AGEJRG', 'WKBJTD', 'QKDHNJ',
    'EYJEMK', 'QEDFZX', 'REQTZC', 'NVEDJU', 'CBHKQP', 'HEQMWB', 'UDGTFR', 'JJTRWD', 'MRBVZB', 'HYMPDQ',
    'GDDTXQ', 'EKMUXM', 'NQTZQE', 'KHFFAY', 'XVRJCM', 'YRZVXN', 'DFWTMD', 'RENXGM', 'VEFDHU', 'CDTVXR',
    'BWHKEY', 'CETCGD', 'UYDXXF', 'UNNHMW', 'WWGJRP', 'EUNVZC', 'XWWHRX', 'DRTCWF', 'QQXVFQ', 'JHRXXG',
    'CVNWMU', 'WDJTRT', 'NWFZJA', 'UFPTAE', 'TBZKXY', 'JCFPGC', 'EZECTA', 'TXTTNM', 'DATJJE', 'EPGFPG',
    'YGTABH', 'NXDYVW', 'PAVFYR', 'GVFPDM', 'BJFWKR', 'CWHPBM', 'UAKJAB', 'BVMAAC', 'BYGJKD', 'BHNPRE',
    'KMDCZP', 'HJUWAG', 'ZEUNUV', 'QDFVHR', 'FCCXTT', 'WUEPBM', 'FUGFMA', 'DDQTQJ', 'UGBDNK', 'MYMZUD',
    'GYDRVR', 'QZDXHX', 'GGBJZF', 'ZUXMYC', 'PJVHHV', 'BGTDPY', 'AEBKGU', 'WCFDGB', 'HAUJNW', 'ZBMJVQ',
    'WMYGEV', 'GHPQNU', 'TKCWYU', 'FPDGQA', 'RJVPHR', 'WEGWPE', 'TVXCYQ', 'YYGUDG', 'DTMNXV', 'VWMHQY',
    'AVDZVJ', 'XDUZDG', 'FDYUBT', 'JJRACU', 'TPRZPZ', 'UECGQE', 'MTEYWG', 'GVFNYP', 'NTAUDT', 'FKRAJE',
    'UWKUNJ', 'EMTCCM', 'FQZGAC', 'TJHBJQ', 'DWMCGW', 'XXGDPG', 'KMVGMJ', 'QMVAZR', 'BFTZRQ', 'XVXKUP',
    'KFGHVK', 'QKTJQQ', 'TFQPRA', 'KNWNBA', 'TCHJXJ', 'VMKCUP', 'NAXQPE', 'TVBUCC', 'ANNNQC', 'YMVGTR',
    'ZXQFHT', 'FJANYK', 'GVEUNM', 'XNFPEZ', 'BWEHTJ', 'QREYKD', 'TJCYBA', 'KCANWR', 'WXCWWG', 'QYVFDE',
    'GTPYFT', 'WZFZUH', 'WXVEXZ', 'QBEQUZ', 'ZZYBQW', 'GHNXPK', 'QGJHNR', 'CXBAVB', 'MCJUCB', 'HDHGBQ',
    'CBVPRX', 'EPVJWT', 'GXHDRV', 'RADUTA', 'MKJDKC', 'RKNQFB', 'WEXNMF', 'QQBUKU', 'YAFCRX', 'YVWVCX',
    'KRTXDB', 'KHZCMF', 'GJVTGQ', 'RMBYZV', 'KJYQRD', 'YQFJXC', 'BVUBKV', 'AVNKZM', 'KGRCFH', 'EWTHRY',
    'VHTTRB', 'XPBCUY', 'MDZFVD', 'CXWXBD', 'KUVWWD', 'FJVDGX', 'ARCMTU', 'JQUAZR', 'XDDJQR', 'FZJBAU',
    'BJCUWH', 'EMGJJR', 'JCFGEB', 'KFJYKG', 'PPCPER', 'KEFVPA', 'VAHAUB', 'DTGTAM', 'CPBGWY', 'WUFHDM',
    'WYQGQF', 'EUHCVE', 'BPXPAN', 'EHVUZE', 'YYMNWE', 'NHPXWY', 'CXPAWY', 'VRTPWK', 'KDQXEJ', 'NTAAPZ',
    'NGNWVZ', 'DQRQCY', 'YMNQJT', 'MCWXDB', 'RCWRDQ', 'JVBFQC', 'BBYFQJ', 'ZKTNAV', 'TEFEAB', 'RQVPWP',
    'ZJETPF', 'EEKKQT', 'JPAEAE', 'BBWJKJ', 'XWRQEG', 'QBVCHK', 'WUPGCJ', 'GMPBNR', 'DURYWV', 'REKGAD',
    'YFYKTV', 'MKDPBN', 'HHNCUP', 'CEWXCW', 'NPHPCH', 'MBFXXT', 'ZPWECU', 'FGWGQH', 'FEYDNT', 'QNJZAR',
    'GVHNYW', 'XUUHUW', 'RQWHTJ', 'KRNHZB', 'AJQEZQ', 'ATGAXA', 'QNARPR', 'NDRAHJ', 'RVTYYD', 'DCDBJY',
    'NEAPFW', 'NKWCNF', 'TZFVRQ', 'ZCMPWE', 'PJRQJZ', 'CFNJTH', 'QRGHDK', 'RGZUZU', 'TTHAWB', 'VDDKTA',
    'VBDPEJ', 'JYAUBG', 'UQNYPB', 'CENWZV', 'TBWQKF', 'JMJNJV', 'DFJHWN', 'UCUDGN', 'QHHHVR', 'FYWGGC',
    'UKFFKE', 'KHDWFX', 'NEMMPT', 'ADXJGQ', 'NGHHDJ', 'EZKVVK', 'JHGUMU', 'EHFJKJ', 'UDHUKG', 'AYZTXW',
    'BHUDZG', 'KHNZGW', 'PKWARC', 'KGHGRN', 'RBPZEH', 'MPJATE', 'EYHAUJ', 'QECMDU', 'THAEYQ', 'HXMXTQ',
    'UHKYGV', 'CQZBCB', 'UWAUPW', 'TCJJHY', 'QUBUJZ', 'KQUCYX', 'NXNYNX', 'EUPBGE', 'VADMJZ', 'UYZBMK',
    'CDYMRC', 'EKQKEC', 'QFBXKM', 'ERZBVR', 'NAFFGJ', 'CVZKJA', 'JJEXWR', 'KVPJTR', 'KNWBJY', 'FCFABX',
    'YRJYQQ', 'AUTZNW', 'UMTBMZ', 'TDPDNY', 'UZZRHP', 'XKCAAX', 'GUQDXA', 'WKUMPA', 'QEMADA', 'VNFUFA',
    'QXUXEA', 'XVZTZQ', 'RRPPBB', 'BDAVTV', 'BYVKCZ', 'VCRJNB', 'KWNVJB', 'RKEANH', 'FYMKRA', 'QRHJJH',
    'NMTCBC', 'QDNCQX', 'JKENDV', 'ATRGFW', 'HGYVAY', 'TFQKMC', 'TRKMEB', 'RAGRBZ', 'WKQNRT', 'NYCTMP',
    'KBDDVM', 'BACDJZ', 'YZNBMD', 'KYCWWP', 'VDTZBM', 'WDYUKJ', 'WGYBEK', 'BKQQEV', 'ZJCCKK', 'FKAFUW',
    'QFJVZJ', 'HPBHXZ', 'GJKMDY', 'NABWYA', 'WCAGBP', 'RMNADV', 'VEYEPP', 'EWBNCH', 'YGZQRV', 'ZDEDNY',
    'VCMBPN', 'EVRFQP', 'RNVEDB', 'KXUCNG', 'BQBDWH', 'PPPBMK', 'RPDYNF', 'YGNZTH', 'WYUNEK', 'YZRRRW',
    'NJWKGX', 'KYCRBB', 'EZDNPQ', 'GYQJDB', 'CFMZEX', 'CDHAWQ', 'NTPYPF', 'GQQDFT', 'QJEVFD', 'XVEQMU',
    'BEDCUG', 'YRNZVY', 'MEZEAM', 'BTMUDZ', 'JAJQUV', 'UXFBTH', 'EMNHAT', 'VTHEUM', 'JHKHHW', 'REXBQW',
    'QXJHYF', 'ACTWQY', 'ZMECZG', 'KKECEA', 'BDHZJX', 'WGAKKT', 'YYTBUC', 'ZPVUMJ', 'NGZKRD', 'WBZAFB',
    'HDMBYW', 'HHVZAA', 'GDDXDM', 'UZRGUF', 'ACNHNP', 'EYJZRT', 'HKFYBA', 'YPFAGC', 'MDFBFE', 'JXMHGU',
    'RVNUXU', 'XPQXYA', 'NJAZTP', 'WAZTYN', 'BQXAVV', 'TARMMR', 'TTNRAC', 'PJJKBF', 'KANHBE', 'WWZKEX',
    'ZWEARW', 'GMMAAU', 'UYYVKC', 'NYWDHW', 'WGKHQX', 'URRTMX', 'CGETPB', 'WMVKRJ', 'NFYMDB', 'TRKPAD',
    'BNXZCN', 'PVPRWV', 'VRXRHM', 'CRWPTX', 'YMEKAE', 'AEJZBJ', 'KTMCQG', 'ZHAZWX', 'TQZJZF', 'XRNUTU',
    'EUVDRB', 'HXPWBN', 'ABFZPD', 'RHXUED', 'QUDNNH', 'RCBEUX', 'ZNFXUE', 'TKXUDC', 'RMWAYM', 'CRBPDF',
    'UDXJUU', 'PVNYJQ', 'XUGHTV', 'UJWVVP', 'RCNCBJ', 'TMAYRY', 'VAAFEY', 'EKPRDU', 'UVPXUB', 'YXAFNZ',
    'RJHAVM', 'CUTCTQ', 'ATTNHX', 'JZEMKY', 'PUZQJF', 'AVXCHF', 'NZRRUB', 'EPUBZG', 'GGRPEK', 'NUVXKK',
    'FPCQUJ', 'GGDEJC', 'UGWVYG', 'EHBXPC', 'UGKFGV', 'KHHPHU', 'YZWVYY', 'CMPEUQ', 'HCVHVG', 'BDDQCG',
    'CJWPZX', 'PQPGDC', 'MTQUHT', 'KPAJEF', 'JHTZGK', 'TUKDYQ', 'VYMETJ', 'NWXWQH', 'WVNRDQ', 'QBCAXD',
    'FYBJNM', 'FKJCQM', 'JQUEZZ', 'CJBAXW', 'NUTDBW', 'MBTXGE', 'EBHTBX', 'VWUWBM', 'MAQDCV', 'TPRFEN',
    'GAHRKX', 'XPGWVZ', 'MYNBBE', 'CQXQXX', 'DYTQNE', 'TMDUZZ', 'BZMNTT', 'NFXENT', 'MJXYAB', 'BFFZJE',
    'DWTDWV', 'KJBHJY', 'GRJUYY', 'ACGUMA', 'BEKWZP', 'YHFBHN', 'AUCDAA', 'QJJTGX', 'TAHTKX', 'JFNYQT',
    'NNRVCT', 'FVBACP', 'NDQMJP', 'GCBKJK', 'XNFDZU', 'DUZMJA', 'KQKCTP', 'NERXCE', 'QJFQNA', 'DWYJDG',
    'QNRJAT', 'QKBYYM', 'GGMPXM', 'KKKZKG', 'NWHUMG', 'JJFYWX', 'TYRKWR', 'BGFBZR', 'HYNADA', 'WAMBUD',
    'XHVCDN', 'GKQRPB', 'TPXKPF', 'RBEVRD', 'GKPRJE', 'GUREBZ', 'PBZPKT', 'KDCMVF', 'HWVGQH', 'KPNREY',
    'TNEMDZ', 'UAQTGH', 'GABMGG', 'WBWMTH', 'YWCHHK', 'RNZHTT', 'CJPDFJ', 'WHRETR', 'XKURHH', 'XMURGC',
    'CYCTAY', 'KPCDVG', 'MCTPAR', 'PHFFZA', 'UVHDUG', 'DQHZUY', 'UYNHZW', 'TYDZNW', 'KEDXCP', 'THRUMY',
    'PMNFZH', 'RZBGGH', 'AHERYZ', 'KDCADC', 'GGHFCB', 'YYTVHF', 'CJNAQQ', 'NQTUVQ', 'UQEEYE', 'DKAKCY',
    'JEUAKK', 'HQHCWN', 'PKBDTQ', 'CYDYGH', 'WGCGVU', 'UVVQVH', 'THXEJK', 'DDGPCV', 'AJCWCE', 'QNGKQZ',
    'FYXFWE', 'CZHRVT', 'CWYGBG', 'WRWNCP', 'YFPPDZ', 'PTCGWD', 'VPCTCK', 'BVRYAP', 'RMUPYU', 'RPXGFV',
    'PTPFKH', 'BKHGNA', 'DNBNRZ', 'NGKQFA', 'YKERMM', 'VMCHRH', 'RPHBPA', 'CFPAJX', 'REXXJK', 'WEPMWG',
    'DNWDXY', 'HJJRMT', 'CZBBXC', 'TEDTQE', 'PRXUVA', 'MGBGTC', 'RVJTUJ', 'NNHBMK', 'PFBYWQ', 'PRNVQU',
    'WQMMRX', 'TBEGBX', 'XPTVZD', 'XAZMXA', 'GFXKKW', 'TJAQFN', 'NWWDRZ', 'RAFRZA', 'EMNXFX', 'WXTDQK',
    'GYNQKV', 'WKQNBF', 'VEGHBH', 'HRHWWM', 'DGAWPB', 'FZRUBA', 'KBQAEZ', 'GMTRXP', 'VQPCNR', 'UMWEZQ',
    'WEAERK', 'GCXBMN', 'HYZXZH', 'VBMVET', 'AYMRMC', 'ANTUCT', 'HJTKZA', 'CHYGKX', 'FNNGMR', 'CAEJZT',
    'GQBRMR', 'PYTPXW', 'VCRVRB', 'YQBBAN', 'MBYUNP', 'MJUMXA', 'YFEYKY', 'XXDUJP', 'FMEYXP', 'XUYKKW',
    'WXYHPC', 'PUBDAR', 'TXFZMM', 'YHAANP', 'BCBJEK', 'VAZEZQ', 'QYQQZR', 'KFFUCQ', 'WBWUUK', 'CPCRPR',
    'EVQYXG', 'RBGGEG', 'ZCURFV', 'FVEBKJ', 'ZBRBJE', 'CVFXJN', 'MXNYNQ', 'NMWZBA', 'JTHKBD', 'QHWYEX',
    'QPFDKC', 'YHRWPG', 'XDZYNG', 'AWJFBY', 'MGDCER', 'DAZYZK', 'XYUXFM', 'KEBYDM', 'NUCDTR', 'DHHKYF',
    'JVBMPF', 'BEXREB', 'FAERFM', 'RUUEWN', 'BCXEAW', 'FRJXPK', 'EKQMJU', 'YYGPKF', 'GTZMUX', 'MAHZTN',
    'XPEUQX', 'CTRGPQ', 'TAUZDG', 'CPZFTZ', 'ETYVNH', 'BFMDMH', 'FDBQAD', 'ZPAJYF', 'UTHCYM', 'AKHCKN',
    'DGFZZD', 'AHGXCF', 'VPNQGB', 'QFHXEE', 'URKTRB', 'YTZEBW', 'UNPVTY', 'GXKTWR', 'RQQNMF', 'CWACWU',
    'TQGJEW', 'HHKUMZ', 'YNAQZJ', 'KVATUR', 'ZTPGAB', 'VHVDMR', 'NQAKVT', 'EAHBAB', 'HRNYER', 'FNKJYH',
    'UFQEED', 'PTUZJD', 'ATBHBC', 'HXJVJZ', 'DWEUTR', 'XXJAMM', 'FRARVR', 'PMMNNY', 'JNQQGM', 'UWBXPU',
    'WVWMTR', 'RNFPET', 'JWCAHY', 'VCMTFG', 'DAUGKD', 'YVPVWT', 'XNNQVD', 'TDGXTY', 'TXAPUF', 'FCRNER',
    'UCKZNG', 'RVCUCR', 'MGZMZF', 'HTHBKK', 'HTXYAB', 'YMJNBD', 'DAMEGU', 'QYYPBW', 'NYGRTF', 'UEZRAG',
    'UQNFPW', 'JZWYYP', 'AGNZQP', 'ANAJTF', 'MDNTXM', 'MZTEQB', 'ZCHNFT', 'QCPWTD', 'UHEKZH', 'KKCHMD',
    'ZWDVTN', 'TEZKGC', 'BYGWDR', 'QUQNHK', 'XCFEXG', 'WTYBHQ', 'EMHZVX', 'PJYCGV', 'EMVHEV', 'TDWUQG',
    'RUEFNJ', 'FZAWRT', 'TEBZAM', 'PKHRCD', 'QZAFNY', 'QAQQQG', 'PEDRRH', 'PZRKYZ', 'DATBZG', 'QYVUVC',
    'UUBHQW', 'WGKMMQ', 'VRQEXY', 'UBMAFY', 'GMMHBQ', 'GMCYFJ', 'CRVKEV', 'PUJHND', 'QCEKFD', 'FZTKZB',
    'XKCFKB', 'WCEBAA', 'JRXRDB', 'GZPDKR', 'TZENZF', 'MAQZXV', 'YGDWFG', 'CWYWRH', 'CQEWXR', 'JEWZGM',
    'MYGRBM', 'HENHMC', 'CRMTJJ', 'FYAUGY', 'KKGNBZ', 'EYAYBY', 'REUKTQ', 'NZGWKM', 'DUNCYM', 'ZAPYKA',
    'NWBCGM', 'HHYMNE', 'GWHDYF', 'XTCVYZ', 'KJGJYP', 'HJMBXB', 'UXTBRB', 'QKTCUA', 'VCPAZJ', 'CMYURQ',
    'WDMUDA', 'DJUAKU', 'HCCCNT', 'JNWJQN', 'RMXAXG', 'FAYNNF', 'CTYDZF', 'VVTVCE', 'XZEXDX', 'FBYBZA',
    'BCAXTK', 'GVUBBV', 'MYFDAH', 'DXHKRA', 'DZYWYD', 'UZUEAC', 'FDCCDY', 'RGTNED', 'NTEDDG', 'WHUJXG',
    'EJKNFU', 'DEYFZK', 'PVPNTF', 'VCYXWQ', 'FGBMUC', 'MTCDWF', 'NMEXBP', 'ZXVTGR', 'UDUWMC', 'ZWFWMT',
    'BECWTK', 'DQRVMN', 'YDYHQA', 'FQBTBX', 'EGFHGP', 'ZJPGHY', 'PTWWYV', 'UUPJYU', 'AFWCBH', 'QATTXN',
    'ZWJPMK', 'UDKBYH', 'CDCVBN', 'RZYGAC', 'UMXGUT', 'RYYKYT', 'PAYGYQ', 'UEPKVB', 'VRPGPK', 'YWJFQJ',
    'UKDGVR', 'VZYTDQ', 'JDUYKG', 'JNRAWE', 'CVNQDZ', 'UCTYNT', 'RMYXNW', 'YWRMQM', 'AGZXVW', 'DCUUMR',
    'RNKURQ', 'AAMCXZ', 'BJPNDB', 'RYVHVG', 'GUXMMG', 'CMNHJF', 'TDKDVP', 'AQTYFJ', 'CDKHJK', 'EMRJGV',
    'NUPQFV', 'YEDFGJ', 'DZVHXW', 'XPNHDP', 'ACXCRU', 'JKCHPN', 'YXREVV', 'ZTFKYW', 'TGBNXB', 'UEQGGH',
    'WMKKCE', 'DAXYTF', 'GQEFGT', 'KCYQWF', 'GFZJKD', 'WMMUUU', 'XKPJQJ', 'MMJUZB', 'GBMPTC', 'PBWKRM',
    'PWVXMT', 'ZDDYXP', 'KPJWDF', 'TEZXQB', 'KJGUYP', 'FRAXMG', 'YFEKNG', 'EGVJFM', 'TQCFFD', 'ECVUVZ',
    'XEYDFZ', 'WGRZQA', 'ZAEAGN', 'VNYZXJ', 'XRAZQY', 'NHQZCY', 'FWPABQ', 'APTWJT', 'ZJXJBA', 'XPXPKH',
    'TWNKVG', 'CRWXDN', 'JQPKTF', 'YVZXVG', 'YHMBGK', 'MCKVGH', 'EXQXCD', 'KAJEJM', 'ECHJXR', 'CHWTFA',
    'KUWJUT', 'YCEDME', 'BKXQWE', 'UQAPKU', 'MVEYTJ', 'JNUGTY', 'ZPGCXR', 'AWXGVC', 'ZMEUKZ', 'TJNUVB',
    'TJNKEY', 'NFEPZZ', 'MGRFQK', 'ZXEAJC', 'JCTDDC', 'NKJRUQ', 'TWQAVF', 'MQAJDB', 'AHDNQB', 'MQGHWW',
    'JAGWQY', 'ZHBDGT', 'TGXCKA', 'NUXGMJ', 'HQQKYA', 'NKKZUQ', 'CBNEQB', 'NWHDBA', 'HGJPXM', 'FCCDEH',
    'YCUFDU', 'FFBEVJ', 'FKTJKD', 'RYYHWM', 'BMJYWV', 'CETCKT', 'YPURQQ', 'KWXBRA', 'QYKZKJ', 'UDFYDV',
    'VAMTUQ', 'NWMCHD', 'PEZGZA', 'ZEGUFU', 'EYDBKD', 'HFZYFD', 'FCFURJ', 'RVXZHV', 'ZEGQFW', 'FZMFXE',
    'RWNKXU', 'RCFVWM', 'RHDHBW', 'HVXPVZ', 'YXVJJM', 'ZVXNKW', 'GRFDFF', 'UDQJEP', 'HYMDUX', 'WEFDUP',
    'HYGPQR', 'ZGGAPD', 'FDQKXA', 'GWQQBU', 'GFYABD', 'EWABCX', 'DHMNXQ', 'MPGBVT', 'WQNKXB', 'UGGZDC',
    'WJRRFU', 'BZMRYH', 'MMWPYN', 'JRXMDH', 'GEZBJR', 'DDPZEP', 'UUBPWC', 'BDANAC', 'YRQDPF', 'BBUGYR',
    'TKBPDH', 'YXDKZY', 'FQQJRB', 'AGYEQK', 'KUMZBR', 'FGVWQE', 'DKBEUD', 'MRATVE', 'QGNJZV', 'VXVYEC',
    'RHMKVU', 'VKEREJ', 'FKKDDH', 'PXXMAR', 'CRQAAW', 'WCZGWM', 'HUQNKJ', 'QXJHHU', 'NYQCGY', 'PDFTHV',
    'JMADTZ', 'KNZERB', 'BYMFGM', 'EXFGTF', 'CXFAFZ', 'QQJFWG', 'XUFFEX', 'JYGMHH', 'XGEJGQ', 'RPTNXX',
    'ZZMGHT', 'YDJJTE', 'BYBPTG', 'JZUGBB', 'RTQVJR', 'VKJQGW', 'FYKFHN', 'EPNBAH', 'AXYVVC', 'QFZEYW',
    'FZMBNA', 'JRHBAM', 'DHVUVX', 'RMQCNR', 'CFZPEV', 'VQCEXE', 'XVFTED', 'BEWXGG', 'TFUJEA', 'WQFGRF',
    'DRVQBF', 'PPCHBB', 'TTMQGK', 'WFTVNN', 'JBDYBJ', 'XZXHCP', 'VPUUWC', 'PKCUHR', 'EKMCQC', 'CQPEJX',
    'UZYUUT', 'RBJMRE', 'ZVVUQK', 'AWNCUD', 'TVFHMW', 'MFADQX', 'FEQARM', 'PQBXTG', 'MMQYVQ', 'EWXKPY',
    'FJQDAB', 'URTFTV', 'WAFCNU', 'ZXJQMF', 'AKQYFM', 'UKJYFC', 'PVFHXV', 'JJPGKY', 'EHPVRF', 'RUPBWV',
    'UGCNBA', 'KYMGKE', 'UYVQRJ', 'DNQJCX', 'BNPXQE', 'GEERZV', 'XJAXEW', 'GMBDKJ', 'ZKHXZY', 'BCPNWN',
    'MBNVDV', 'UCBRUJ', 'MFVPKY', 'TMZZTP', 'GMCNMG', 'ZYYNYJ', 'KADJAG', 'NPYEKT', 'BHTZDK', 'EDUDDD',
    'RUNFKW', 'MQUDHM', 'CAYKFR', 'RNPQVR', 'NVKFVA', 'RBDXFR', 'EPFADM', 'JMWJMY', 'TQKATA', 'JCZCQQ',
    'JBUKWB', 'EAAVMC', 'RBDGVZ', 'EXYXDP', 'XZJFCV', 'FAEEUZ', 'KTUJQZ', 'QBXBKA', 'FGRTRN', 'JCKMQM',
    'UZCRNX', 'WMGPPK', 'WFHMVZ', 'VRXMEF', 'QGEDZU', 'APCEVK', 'TCYPEV', 'XKJRAX', 'BGCPKE', 'AVFPWF',
    'TJQTUB', 'VVABPR', 'TKZMGC', 'PKRZJJ', 'TPCRCE', 'RFZNUZ', 'UBFZTW', 'JAVQGG', 'JUFXFB', 'DGFFHC',
    'TCZCRQ', 'EZPJMA', 'KKPDBQ', 'CFPYDV', 'THWRRD', 'MDKGFT', 'GAZHRH', 'XMBNPZ', 'MYCAPC', 'JJZTWM',
    'CHGXPQ', 'EXCTTQ', 'EHAHGG', 'FZDYZP', 'XZRTYJ', 'BNNFBR', 'FEPGNG', 'ZFDYQU', 'DNKRNT', 'EXDKAW',
    'CMCFPW', 'QQPPHC', 'JJEJNG', 'UQBYJD', 'FTRVKB', 'VMUQYD', 'DBBNMV', 'DDTFUR', 'MHKBQC', 'KDRNVZ',
    'KZPUXT', 'JQRGUF', 'GDWNRT', 'CZWQHK', 'KPRJED', 'WENPEU', 'KVFVVZ', 'XCAVCE', 'PERVYA', 'RHXPHN',
    'NUCENW', 'XPYZWM', 'QPJNVG', 'YPJTJG', 'ETYAUB', 'HATNDU', 'QNQQQR', 'YCNEYY', 'JDYPGC', 'MFDTNM',
    'HNWZFP', 'CDTEHX', 'YJUGFE', 'XGWYVB', 'NTZPPY', 'YFRVRB', 'RMKXQJ', 'NMFUFC', 'BMAWBD', 'RHKPHR',
    'HJMDYE', 'GKQFDJ', 'PBMWMG', 'FRKFAC', 'NWQKDQ', 'WDNYMA', 'NYFFXJ', 'ECHWMV', 'DVZJYQ', 'DJEZMU',
    'JNMXDZ', 'XTPYXV', 'YFVWNW', 'AZTFNE', 'TFXQNT', 'HXPWVD', 'JYDDYE', 'FJKQNT', 'TZXMFM', 'REFNMJ',
    'AYRYPX', 'CCKWEQ', 'FTWDPN', 'EEBGRZ', 'MBYHXM', 'XECKDW', 'QWCXQZ', 'MAGTPX', 'TTEYFX', 'EURCRT',
    'RGPZRT', 'YQRTJK', 'KZYMFN', 'NBZYGD', 'MBQBUZ', 'PABDMF', 'FWHBFZ', 'XDQCYN', 'NTCCDP', 'MUTMDK',
    'JPTBAB', 'ZBJXNH', 'GRPNPK', 'TTKPQP', 'YHUEEA', 'UFHCCM', 'CUHXYE', 'DRAEXW', 'GHKRCD', 'PXKFDB',
    'YCDFHN', 'NZEYPD', 'RPEVWG', 'FVCKTV', 'YCWNNG', 'THFVAM', 'NUTUEN', 'XQVCKQ', 'UUYJDX', 'MJRHQB',
    'YAFBZJ', 'QQQDVU', 'VJWRPJ', 'KRDKAK', 'PGYRVE', 'EECAUH', 'BTCZGX', 'AFHRWK', 'BGJMQE', 'AEADDC',
    'GVCJRT', 'ECEFYA', 'UMCYGH', 'BFKYAQ', 'HUMTZP', 'NQZHQN', 'FPNJDG', 'FDTAVA', 'GKETQW', 'ZDTRTR',
    'RNHRDN', 'VTZZUR', 'YRRYEY', 'VXQAYY', 'GDTDKJ', 'GRVBBC', 'XPEEYT', 'ADBFFR', 'PDPXWY', 'TKBVMU',
    'KVFDKC', 'XNZNCQ', 'DFNWVP', 'XEUGHP', 'DGHJZD', 'ENHZNG', 'TBTPXX', 'DUTFWG', 'REGXCN', 'MTJTUF',
    'YTACUD', 'MWXTMB', 'JAFEWV', 'EFVKRF', 'YTTPYH', 'REDJHF', 'APJRBK', 'WKGTJR', 'RBEVVD', 'QJRTTE',
    'XECMNC', 'ACQJFU', 'EXNUVA', 'YNXBNN', 'YQMCND', 'EFVHMY', 'UYFCUE', 'PECTRY', 'GDNXWF', 'UXADVX',
    'PNRYDH', 'WBRVHP', 'DGQDKM', 'EVFJAR', 'FHBTGD', 'PZBTKW', 'VUHEYC', 'DYDHDN', 'MYRJCK', 'VQCUYC',
    'GBGYEG', 'HREUKN', 'VGQHZY', 'NGQJKY', 'TDJBEV', 'CYQDMK', 'HEUPKT', 'QAAWDB', 'DRVUFX', 'AVVBBM',
    'WRKHVC', 'KMGBCJ', 'QRWBMF', 'XGFRCA', 'UQJPJC', 'URTQKW', 'AHGVCW', 'XQWAEX', 'GFZYNC', 'DDZWZP',
    'YMFVXP', 'ZYUVAK', 'GHMPZT', 'UAUFRR', 'DGDQXG', 'WDYFZV', 'MXXDQR', 'UTBAZE', 'MCPMMM', 'ADGFEV',
    'KDJQWD', 'TCDXYE', 'CBCRMN', 'VFNFQA', 'YXCNDB', 'BMXCRV', 'ZDTGGN', 'UEXHPQ', 'MUMHNT', 'RRNVEZ',
    'CWFQHR', 'DPDJFW', 'XZCUTX', 'ZZGTMB', 'MCUGPN', 'RZMQBK', 'CADEUG', 'UFWRJP', 'MPEAAG', 'VZTDKM',
    'QZAVZV', 'ZFAHHP', 'GFNMAY', 'AUAJEQ', 'MCZAKJ', 'KGMRPR', 'KBRUFH', 'PZGBVC', 'XTKPEY', 'MCQCBG',
    'CUBNZH', 'ZRXXGU', 'YDNUXH', 'XBNKNJ', 'CEQCAY', 'BHJZRR', 'XKBCCX', 'EEQJBP', 'NRYJJH', 'TTQFHP',
    'VHQXJB', 'PCUWJM', 'BNDKFX', 'CHQTRE', 'BURZPQ', 'ZBDBFY', 'TCDWJN', 'KHAMNZ', 'EDMQEG', 'ZFJXDV',
    'ZEYDWX', 'EJCRDJ', 'VYHMVK'
] // 50 Usos c/u

// 3. CATALOGO DE COLEGIOS
const INSTITUCIONES_DATA = [
    { nombre: "Colegio Marie Clarac", codigo_obj: "cmc", codigo_corto: "cmc", tipo: "premium", codigo_colegio: "17P1" },
    { nombre: "Colegio Ecuatoriano Suizo", codigo_obj: "es", codigo_corto: "es", tipo: "premium", codigo_colegio: "1703" },
    { nombre: "Colegio El Prado", codigo_obj: "pr", codigo_corto: "pr", tipo: "basico", codigo_colegio: "1704" },
    { nombre: "Colegio Jose Engling", codigo_obj: "je", codigo_corto: "je", tipo: "basico", codigo_colegio: "1706" },
    { nombre: "Colegio Martím Cerere", codigo_obj: "mc", codigo_corto: "mc", tipo: "basico", codigo_colegio: "1707" },
    { nombre: "U.E.S Cardenal Spellman", codigo_obj: "cs", codigo_corto: "cs", tipo: "premium", codigo_colegio: "1713" },
    { nombre: "U.E. Los Olivos Kids", codigo_obj: "uelok", codigo_corto: "uelok", tipo: "premium", codigo_colegio: "1715" },
    { nombre: "Bilingual Christian School Nuevo Amanecer", codigo_obj: "bcsna", codigo_corto: "bcsna", tipo: "basico", codigo_colegio: "1716" },
    { nombre: "Liceo La Alborada Quito", codigo_obj: "laq", codigo_corto: "laq", tipo: "basico", codigo_colegio: "1717" },
    { nombre: "U.E.P. La Dolorosa", codigo_obj: "uepd", codigo_corto: "uepd", tipo: "basico", codigo_colegio: "1718" },
    { nombre: "U.E.P. La Dolorosa (AI EMPOWERING)", codigo_obj: "uepde", codigo_corto: "uepde", tipo: "basico", codigo_colegio: "17P16" },
    { nombre: "Centro Educativo Planeta Azul", codigo_obj: "cepa", codigo_corto: "cepa", tipo: "premium", codigo_colegio: "1721" },
    { nombre: "Shakespeare School", codigo_obj: "ss", codigo_corto: "ss", tipo: "essential", codigo_colegio: "1722" },
    { nombre: "U. E. Salesiana Santo Tomas Apóstol", codigo_obj: "sr", codigo_corto: "sr", tipo: "basico", codigo_colegio: "0601" },
    { nombre: "Unidad Educativa A.P.Ch", codigo_obj: "apch", codigo_corto: "apch", tipo: "premium", codigo_colegio: "1725" },
    { nombre: "JESSS International Christian Academy", codigo_obj: "jesss", codigo_corto: "jesss", tipo: "premium", codigo_colegio: "17P14" },
    { nombre: "U. E. Particular La presentación", codigo_obj: "lpr", codigo_corto: "lpr", tipo: "premium", codigo_colegio: "17P11" },
    { nombre: "U.E Particular Cristiana John Osteen", codigo_obj: "cjo", codigo_corto: "cjo", tipo: "essential", codigo_colegio: "17P12" },
    { nombre: "U.E Particular Bilingüe Julio Verne", codigo_obj: "bjv", codigo_corto: "bjv", tipo: "essential", codigo_colegio: "17P13" },
    { nombre: "Colegio Alliance Academy", codigo_obj: "caa", codigo_corto: "caa", tipo: "basico", codigo_colegio: "17P14" },
    { nombre: "Unidad Educativa Boston", codigo_obj: "ueb", codigo_corto: "ueb", tipo: "premium", codigo_colegio: "0901" },
    { nombre: "Colegio UEPRIM", codigo_obj: "ueprim", codigo_corto: "ueprim", tipo: "premium", codigo_colegio: "0701" },
    { nombre: "U.E. Las America", codigo_obj: "uela", codigo_corto: "uela", tipo: "premium", codigo_colegio: "0902" },
    { nombre: "Unidad Educativa Montessori", codigo_obj: "uem", codigo_corto: "uem", tipo: "premium", codigo_colegio: "0903" },
    { nombre: "U.E. Crear Santo Domingo", codigo_obj: "uecsd", codigo_corto: "uecsd", tipo: "basico", codigo_colegio: "2301" },
    { nombre: "U.E. San Francisco de Asís Guayaquil", codigo_obj: "uesf", codigo_corto: "uesf", tipo: "basico", codigo_colegio: "09P6" },
    { nombre: "Unidad Educativa Miraflores", codigo_obj: "uemf", codigo_corto: "uemf", tipo: "premium", codigo_colegio: "09P8" },
    { nombre: "Unidad Educativa Montessori Salinas", codigo_obj: "uems", codigo_corto: "uems", tipo: "essential", codigo_colegio: "0801" },
    { nombre: "Unidad Educativa Jambelí Manta", codigo_obj: "uejm", codigo_corto: "uejm", tipo: "essential", codigo_colegio: "0802" },
    { nombre: "Unidad Educativa Bilingüe Internacional La Moderna", codigo_obj: "ueblm", codigo_corto: "ueblm", tipo: "premium", codigo_colegio: "09P9" },
    { nombre: "U.E Ceila", codigo_obj: "ceila", codigo_corto: "ceila", tipo: "essential", codigo_colegio: "17P15" },
    { nombre: "U.E. Innova Salinas", codigo_obj: "ueis", codigo_corto: "ueis", tipo: "basico", codigo_colegio: "0803" }
]

// Función helper para generar códigos aleatorios para Essential
function generarCodigoEssential() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result
}

async function main() {
    console.log('🌱 Iniciando carga de datos (Seeding)...')

    // --- 0. TIPOS DE SUSCRIPCION (Catálogo) ---
    const TIPOS = ['PREMIUM', 'BÁSICA', 'ESSENTIAL']
    const mapTipos = new Map<string, number>()

    for (const nombre of TIPOS) {
        const tipo = await prisma.tipo_suscripcion.upsert({
            where: { tsu_nombre: nombre },
            update: {},
            create: { tsu_nombre: nombre }
        })
        mapTipos.set(nombre, tipo.pk_id_tipo_suscripcion)
    }

    // --- ROBOTS ---
    for (const nombre of ROBOTS_DATA) {
        await prisma.robot.upsert({ where: { rob_nombre: nombre }, update: {}, create: { rob_nombre: nombre } })
    }

    // --- CATALOGOS BASICOS ---
    const estadosPedido = ['PENDIENTE', 'EN_PROCESO', 'COMPLETADO', 'CANCELADO']
    for (const nombre of estadosPedido) await prisma.estado_pedido.upsert({ where: { esp_nombre: nombre }, update: {}, create: { esp_nombre: nombre } })

    const tiposPedido = ['NUEVO', 'REASIGNACION']
    for (const nombre of tiposPedido) await prisma.tipo_pedido.upsert({ where: { tpe_nombre: nombre }, update: {}, create: { tpe_nombre: nombre } })

    const estadosLicencia = ['ACTIVA', 'INACTIVA', 'PERDIDA1', 'REASIGNADA', 'PERDIDA2']
    for (const nombre of estadosLicencia) await prisma.estado_licencia.upsert({ where: { esl_nombre: nombre }, update: {}, create: { esl_nombre: nombre } })

    // --- ASIGNACIÓN ---
    let pIdx = 0
    let bIdx = 0

    for (const inst of INSTITUCIONES_DATA) {
        const tipoRaw = inst.tipo.toUpperCase()

        let assignedCode = null
        let tipoNombre = ''

        // Asignación de Código y Tipo
        if (tipoRaw === 'PREMIUM' || tipoRaw === 'FULL') {
            assignedCode = VEX_PREMIUM[pIdx % VEX_PREMIUM.length]
            tipoNombre = 'PREMIUM'
            pIdx++
        } else if (tipoRaw === 'ESSENTIAL') {
            assignedCode = generarCodigoEssential()
            tipoNombre = 'ESSENTIAL'
        } else {
            assignedCode = VEX_BASIC[bIdx % VEX_BASIC.length]
            tipoNombre = 'BÁSICA'
            bIdx++
        }

        if (!assignedCode) continue

        // Obtener ID del Tipo de Suscripcion
        const fkTipo = mapTipos.get(tipoNombre)

        // Crear/Buscar suscripcion
        // Ahora buscamos por codigo_vex AND tipo_suscripcion (por si un codigo existiera en dos tipos, aunque improbable)
        // Nota: Como 'sus_nombre' ya no existe, usamos fkTipo para diferenciar conceptualmente
        let sub = await prisma.suscripcion.findFirst({
            where: {
                sus_codigo_vex: assignedCode,
                fk_id_tipo_suscripcion: fkTipo
            }
        })

        if (!sub) {
            sub = await prisma.suscripcion.create({
                data: {
                    sus_codigo_vex: assignedCode,
                    sus_cantidad_limite: 50,
                    // Aqui usamos el ID numérico del catálogo
                    fk_id_tipo_suscripcion: fkTipo!
                }
            })
            console.log(`✨ [${tipoNombre}] Creada suscripción ${assignedCode} para ${inst.nombre}`)
        } else {
            console.log(`♻️ [${tipoNombre}] Reusando suscripción ${assignedCode} para ${inst.nombre}`)
        }

        // VINCULAR A LA INSTITUCIÓN
        let existingInst = await prisma.institucion.findFirst({ where: { ins_nombre: inst.nombre } })
        if (!existingInst) {
            existingInst = await prisma.institucion.create({
                data: {
                    ins_nombre: inst.nombre,
                    ins_codigo_corto: inst.codigo_corto,
                    ins_codigo_colegio: inst.codigo_colegio,
                    ins_codigo_obj: inst.codigo_obj
                }
            })
        }

        // Crear registro en Tabla Intermedia
        const vinculo = await prisma.institucion_suscripcion.findFirst({
            where: {
                fk_id_institucion: existingInst.pk_id_institucion,
                fk_id_suscripcion: sub.pk_id_suscripcion
            }
        })

        if (!vinculo) {
            await prisma.institucion_suscripcion.create({
                data: {
                    fk_id_institucion: existingInst.pk_id_institucion,
                    fk_id_suscripcion: sub.pk_id_suscripcion,
                    isu_estado: 'ACTIVO'
                }
            })
        }
    }

    console.log('✅ Seeding completado exitosamente.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
