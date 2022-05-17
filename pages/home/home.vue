<template>
    <view class = "main-content">
       <view class="title">
           <view>
               <svg t="1647508037164" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="901" width="30" height="30"><path d="M614.4 128A76.8 76.8 0 0 1 691.2 204.8v76.8h108.4416a76.8 76.8 0 0 1 76.4928 69.4272l0.3072 7.3728v409.6a76.8 76.8 0 0 1-69.376 76.4416l-7.424 0.3584H204.8A76.8 76.8 0 0 1 128 768V204.8A76.8 76.8 0 0 1 204.8 128z m185.2416 204.8H691.2V768c0 9.0112-1.536 17.6128-4.4032 25.6h112.8448a25.6 25.6 0 0 0 25.1904-20.992l0.4096-4.608V358.4a25.6 25.6 0 0 0-20.992-25.1904l-4.608-0.4096zM614.4 179.2H204.8a25.6 25.6 0 0 0-25.6 25.6v563.2a25.6 25.6 0 0 0 25.6 25.6h76.7488L281.6 563.2a25.6 25.6 0 0 1 20.992-25.1904L307.2 537.6h204.8a25.6 25.6 0 0 1 25.1904 20.992l0.4096 4.608v230.4H614.4a25.6 25.6 0 0 0 25.1904-20.992L640 768V204.8a25.6 25.6 0 0 0-25.6-25.6z m-128 409.6H332.7488v204.8H486.4v-204.8z m0-204.8a25.6 25.6 0 0 1 4.608 50.7904L486.4 435.2h-153.6a25.6 25.6 0 0 1-4.608-50.7904L332.8 384h153.6z m0-128a25.6 25.6 0 0 1 4.608 50.7904L486.4 307.2h-153.6a25.6 25.6 0 0 1-4.608-50.7904L332.8 256h153.6z" p-id="902"></path></svg>
           </view>
            <view>南昌大学第一附属医院</view>
        </view>
        <view class="book-wrapper">
			<view>
				  <u-notice-bar color="black" bgColor="white"
				  @click="handleToHealthyDetail(noticeDetail.id)"  
				  :text="Boolean(noticeDetail.tipsTitle)?noticeDetail.tipsTitle:''">
				  </u-notice-bar>
			</view>
            <view class="book-item">
                <view class="item" @click="handleToAdvancePhyExam">
                    <view style="pading-right:20px;" >
                        <svg t="1647505967155" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23341" width="50" height="50"><path d="M702.0032 897.024h-462.848c-59.4944 0-107.7248-48.2304-107.7248-107.7248V257.6896c0-66.6624 54.0672-120.7296 120.7296-120.7296h329.1648c66.6624 0 120.7296 54.0672 120.7296 120.7296V897.024z" fill="#B3F4EF" p-id="23342"></path><path d="M511.3344 144.3328s96.1024 41.8304 96.1024 119.8592v625.3056h101.7856V270.9504c0-75.776-56.5248-135.68-197.888-126.6176z" fill="#94E0DE" p-id="23343"></path><path d="M311.7568 147.712s-89.3952 23.7568-89.3952 113.1008v521.3184c0 41.8304 13.3632 99.5328 73.984 111.9744-78.1312 0-170.5984 18.0736-170.5984-116.48V249.5488c0-56.5248 60.6208-130.0992 186.0096-101.8368z" fill="#E9FFFF" p-id="23344"></path><path d="M798.8224 897.024h-96.256V404.0704h119.1424c42.8032 0 77.4656 34.6624 77.4656 77.4656v315.0848c0 55.4496-44.9536 100.4032-100.352 100.4032z" fill="#FFD16C" p-id="23345"></path><path d="M770.048 412.3136s58.7776 7.5264 58.7776 58.7776v315.136c0 35.4304-3.0208 87.4496-73.1136 99.5328 82.944 0 135.68-9.7792 135.68-110.7968V461.3632c0.0512-38.5024-66.304-58.0608-121.344-49.0496z" fill="#FFC50B" p-id="23346"></path><path d="M821.7088 378.4704h-94.1056V257.6896c0-80.6912-65.6384-146.3296-146.3296-146.3296H252.16c-80.6912 0-146.3296 65.6384-146.3296 146.3296v531.6096c0 73.5232 59.8016 133.3248 133.3248 133.3248h462.848c0.1024 0 0.2048-0.0512 0.256-0.0512s0.2048 0.0512 0.256 0.0512h96.256c69.4272 0 125.952-56.5248 125.952-125.952V481.536c0.0512-56.832-46.1824-103.0656-103.0144-103.0656z m-145.3056 492.9536h-437.248c-45.2608 0-82.1248-36.8128-82.1248-82.1248V257.6896c0-52.4288 42.6496-95.1296 95.1296-95.1296h329.1648c52.4288 0 95.1296 42.6496 95.1296 95.1296V871.424z m197.1712-74.8032c0 41.216-33.536 74.752-74.752 74.752h-70.656V429.6704h93.5424c28.5696 0 51.8656 23.2448 51.8656 51.8656v315.0848z" fill="#434A54" p-id="23347"></path><path d="M551.68 453.9392H293.9392c-14.1312 0-25.6-11.4688-25.6-25.6s11.4688-25.6 25.6-25.6h257.7408c14.1312 0 25.6 11.4688 25.6 25.6s-11.4688 25.6-25.6 25.6zM551.68 670.9248H293.9392c-14.1312 0-25.6-11.4688-25.6-25.6s11.4688-25.6 25.6-25.6h257.7408c14.1312 0 25.6 11.4688 25.6 25.6s-11.4688 25.6-25.6 25.6z" fill="#434A54" p-id="23348"></path></svg>
                    </view>
                    <view >预 约 体 检</view>
                </view>
                <view class="item"  @click="handleToReport">
                   <view style="pading-right:20px;">
                       <svg t="1647505545152" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22769" width="50" height="50"><path d="M322.6624 518.7072c10.5984 0 20.48 5.376 26.0096 14.3872 33.6384 54.8864 94.1056 91.4944 163.1744 91.4944s129.536-36.608 163.1744-91.4944c5.5296-9.0112 15.4624-14.3872 26.0096-14.3872h116.8896V228.352c0-49.4592-40.0896-89.5488-89.5488-89.5488H295.3216c-49.4592 0-89.5488 40.0896-89.5488 89.5488v290.304h116.8896z" fill="#E6E6FF" p-id="22770"></path><path d="M627.456 144.3328s91.5968 14.6944 91.5968 91.5968v329.0624h96.1024V230.2976c0-53.1456-42.9568-110.848-187.6992-85.9648z" fill="#C9C9F4" p-id="22771"></path><path d="M391.1168 144.3328S299.52 159.0272 299.52 235.9296v329.0624H203.4176V230.2976c0-53.1456 42.9568-110.848 187.6992-85.9648z" fill="#F8F8FF" p-id="22772"></path><path d="M700.9792 518.7072c-10.5984 0-20.48 5.376-26.0096 14.3872-33.6384 54.8864-94.1056 91.4944-163.1744 91.4944s-129.536-36.608-163.1744-91.4944c-5.5296-9.0112-15.4624-14.3872-26.0096-14.3872H192.3072c-44.032 0-79.7184 35.6864-79.7184 79.7184v183.0912c0 62.5664 50.688 113.2544 113.2544 113.2544H797.696c62.5664 0 113.2544-50.688 113.2544-113.2544v-183.0912c0-44.032-35.6864-79.7184-79.7184-79.7184h-130.2528z" fill="#FFE8B2" p-id="22773"></path><path d="M255.7952 533.504s-65.9456 6.8096-65.9456 65.9456v194.8672c0 28.6208 11.6736 70.8608 84.0704 92.7232-84.4288 0-149.9648-23.1424-149.9648-105.0624v-196.5056c0-29.3888 24.0128-74.5984 131.84-51.968z" fill="#FFF2D7" p-id="22774"></path><path d="M766.976 533.504s65.9456 6.8096 65.9456 65.9456v194.8672c0 28.6208-11.6736 70.8608-84.0704 92.7232 84.4288 0 149.9648-23.1424 149.9648-105.0624v-196.5056c0-29.3888-24.0128-74.5984-131.84-51.968z" fill="#E8BC70" p-id="22775"></path><path d="M386.304 303.3088h251.0848c14.1312 0 25.6-11.4688 25.6-25.6s-11.4688-25.6-25.6-25.6H386.304c-14.1312 0-25.6 11.4688-25.6 25.6s11.4176 25.6 25.6 25.6z" fill="#434A54" p-id="22776"></path><path d="M843.4688 493.824V228.352c0-63.488-51.6608-115.1488-115.1488-115.1488H295.3216c-63.488 0-115.1488 51.6608-115.1488 115.1488v265.472C127.7952 499.9168 87.04 544.4096 87.04 598.3744v183.0912c0 76.5952 62.3104 138.8544 138.8544 138.8544h571.8528c76.5952 0 138.8544-62.3104 138.8544-138.8544v-183.0912c0-53.9648-40.7552-98.4576-93.1328-104.5504zM231.3728 228.352c0-35.2256 28.672-63.9488 63.9488-63.9488h433.0496c35.2768 0 63.9488 28.672 63.9488 63.9488v264.704h-91.2896c-19.456 0-37.7856 10.1888-47.872 26.624-30.4128 49.6128-83.2512 79.2576-141.312 79.2576-10.9056 0-21.6064-1.024-32-3.072a163.2256 163.2256 0 0 1-20.3776-5.3248c-36.5056-12.0832-68.0448-36.7616-88.9344-70.8608-0.768-1.2288-1.6384-2.3552-2.5088-3.5328-0.5632-0.768-1.0752-1.5872-1.6384-2.3552l-0.1536-0.1536c-10.496-12.8512-26.624-20.6336-43.5712-20.6336H231.3728V228.352z m654.0288 553.1136c0 48.3328-39.3216 87.6544-87.6544 87.6544H225.8944c-48.3328 0-87.6544-39.3216-87.6544-87.6544v-183.0912c0-29.8496 24.2688-54.1184 54.1184-54.1184H322.7136c1.792 0 3.3792 0.8192 4.1984 2.1504 39.7824 64.9216 108.9536 103.68 184.9856 103.68 28.5184 0 56.064-5.4272 81.4592-15.6672 25.3952-10.24 48.64-25.2416 68.5568-44.3904l0.768-0.768c3.5328-3.4304 6.912-6.9632 10.1888-10.6496a217.1392 217.1392 0 0 0 24.0128-32.1536c0.0512-0.1024 0.1536-0.2048 0.256-0.3072 0.8704-1.1776 2.3552-1.8944 3.9424-1.8944H831.4368c29.8496 0 54.1184 24.2688 54.1184 54.1184v183.0912z" fill="#434A54" p-id="22777"></path></svg>
                   </view>
                    <view>体 检 报 告</view>
                </view>
            </view>
            <view style="height:5px;"></view>
            <view class="book-item">
                <view class="item" @click="handleToProject">
                    <view style="pading-right:20px;">
                        <svg t="1647505993991" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23484" width="50" height="50"><path d="M738.8672 892.4672H286.4128c-86.784 0-157.184-70.3488-157.184-157.184V285.1328c0-86.784 70.3488-157.184 157.184-157.184h452.4544c86.784 0 157.184 70.3488 157.184 157.184v450.0992c0 86.8352-70.3488 157.2352-157.184 157.2352z" fill="#7BD3FF" p-id="23485"></path><path d="M240.4352 722.176V282.3168c0-79.872 108.9024-137.6256 108.9024-137.6256s-0.512-3.0208-1.3312-8.1408c-6.8608 6.144-15.6672 9.7792-25.0368 9.7792h-54.784c-77.1584 0-139.7248 65.6384-139.7248 146.6368v434.1248c0 80.9984 62.5664 146.6368 139.7248 146.6368h20.1216c11.52-1.024 23.296-1.6384 35.2768-1.6384-91.3408-30.72-83.1488-105.6768-83.1488-149.9136z" fill="#AEECFF" p-id="23486"></path><path d="M773.5296 722.176V282.3168c0-79.872-108.9024-137.6256-108.9024-137.6256s0.512-3.0208 1.3312-8.1408c6.8608 6.144 15.6672 9.7792 25.0368 9.7792h54.784c77.1584 0 139.7248 65.6384 139.7248 146.6368v434.1248c0 80.9984-62.5664 146.6368-139.7248 146.6368h-20.1216c-11.52-1.024-23.296-1.6384-35.2768-1.6384 91.3408-30.72 83.1488-105.6768 83.1488-149.9136z" fill="#5AB3FF" p-id="23487"></path><path d="M738.8672 918.0672H286.4128c-100.7616 0-182.784-81.9712-182.784-182.784V285.1328c0-100.7616 81.9712-182.784 182.784-182.784h452.4544c100.7616 0 182.784 81.9712 182.784 182.784v450.0992c0 100.8128-81.9712 182.8352-182.784 182.8352zM286.4128 153.5488c-72.5504 0-131.584 59.0336-131.584 131.584v450.0992c0 72.5504 59.0336 131.584 131.584 131.584h452.4544c72.5504 0 131.584-59.0336 131.584-131.584V285.1328c0-72.5504-59.0336-131.584-131.584-131.584H286.4128z" fill="#434A54" p-id="23488"></path><path d="M361.984 720.9984c-14.1312 0-25.6-11.4688-25.6-25.6V490.9056c0-14.1312 11.4688-25.6 25.6-25.6s25.6 11.4688 25.6 25.6v204.4928c0 14.1312-11.4688 25.6-25.6 25.6zM669.4912 720.9984c-14.1312 0-25.6-11.4688-25.6-25.6V490.9056c0-14.1312 11.4688-25.6 25.6-25.6s25.6 11.4688 25.6 25.6v204.4928c0 14.1312-11.4688 25.6-25.6 25.6zM516.5056 723.3024c-14.1312 0-25.6-11.4688-25.6-25.6V324.6592c0-14.1312 11.4688-25.6 25.6-25.6s25.6 11.4688 25.6 25.6v373.0944c0 14.1312-11.4688 25.5488-25.6 25.5488z" fill="#434A54" p-id="23489"></path></svg>
                    </view>
                    <view >预 约 项 目</view>
                </view>
                <view class="item"  @click="handleToTest">
                    <view style="pading-right:20px;">
                        <svg t="1647505700706" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22913" width="50" height="50"><path d="M115.4048 821.4016V236.2368c0-9.5744 4.7616-18.432 12.7488-23.7056C174.08 182.3744 337.408 95.0272 508.672 241.9712c126.6688-155.9552 327.7312-65.1776 383.1296-34.2016a28.3648 28.3648 0 0 1 14.592 24.7808v589.3632c0 11.776-12.9024 18.8928-22.9888 12.6976-54.528-33.5872-200.3456-97.4848-373.0432 37.0688-111.1552-130.6624-296.8576-88.32-371.5584-37.8368-9.9328 6.7584-23.3984-0.4096-23.3984-12.4416z" fill="#C0DAF9" p-id="22914"></path><path d="M219.5456 170.9568c-42.4448 12.0832-74.7008 30.5664-91.392 41.5232a28.25728 28.25728 0 0 0-12.7488 23.7056v585.1648c0 12.0832 13.4656 19.2 23.4496 12.4416 20.0704-13.568 48.1792-26.5216 80.6912-35.6864V170.9568zM593.4592 174.7968c-30.1056 13.8752-58.9824 35.3792-84.736 67.1744-28.8768-24.7808-57.5488-42.8544-85.4528-55.7056v620.4416c31.488 13.7728 61.3376 34.6624 87.0912 64.9728 28.5184-22.2208 56.32-39.0144 83.0464-51.4048V174.7968zM892.928 207.7696c-16.1792-9.728-45.7216-25.3952-82.3296-37.4272v629.7088a277.23776 277.23776 0 0 1 74.496 34.56c9.3184 6.1952 21.3504-0.9216 21.3504-12.6976V232.5504c0-10.2912-5.1712-19.7632-13.5168-24.7808z" fill="#9EBFEF" p-id="22915"></path><path d="M198.0928 191.0784v607.5904l64.8192-12.8V158.6688zM584.0384 191.0784v607.5904l64.8704-12.8V158.6688z" fill="#E9F5FF" p-id="22916"></path><path d="M904.3456 185.3952c-42.2912-23.6032-253.5424-129.4336-398.5408 21.1968-177.408-135.8848-343.6544-47.0016-391.68-15.5136a53.7856 53.7856 0 0 0-24.32 45.1072v585.1648a40.5504 40.5504 0 0 0 21.5552 35.8912 40.56576 40.56576 0 0 0 41.8304-2.2528c68.5056-46.2848 237.8752-84.1216 337.7152 33.2288a25.5488 25.5488 0 0 0 35.2256 3.584c159.9488-124.5696 293.7856-66.304 343.9104-35.4304a40.66304 40.66304 0 1 0 62.0032-34.56V232.5504c0-19.5584-10.5984-37.5808-27.6992-47.1552zM313.5488 759.1936h-2.7648c-69.4272 0.5632-130.304 21.248-169.728 43.3152V236.2368c0-0.9728 0.4608-1.792 1.1776-2.304 41.472-27.2384 187.0336-104.8576 341.4528 20.48l1.536 558.6944c-58.0608-43.264-122.624-53.9136-171.6736-53.9136z m567.296 44.3904c-62.8736-33.8432-191.9488-76.9024-344.3712 18.6368l-1.536-571.5968c119.5008-135.7824 307.456-41.216 344.4736-20.5312 0.9216 0.512 1.4336 1.4336 1.4336 2.4576v571.0336z" fill="#434A54" p-id="22917"></path></svg>
                    </view>
                    <view>体 检 问 卷</view>
                </view>
            </view>
        </view>
        <view>
			<view class="title" style="border-top:none">
				<view>
				    <svg t="1647508092105" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1038" width="30" height="30"><path d="M768 128A76.8 76.8 0 0 1 844.8 204.8v614.4a76.8 76.8 0 0 1-76.8 76.8H256A76.8 76.8 0 0 1 179.2 819.2V204.8A76.8 76.8 0 0 1 256 128z m0 51.2H256a25.6 25.6 0 0 0-25.6 25.6v614.4a25.6 25.6 0 0 0 25.6 25.6h512a25.6 25.6 0 0 0 25.6-25.6V204.8a25.6 25.6 0 0 0-25.6-25.6z m-153.6 512a25.6 25.6 0 0 1 4.608 50.7904L614.4 742.4H409.6a25.6 25.6 0 0 1-4.608-50.7904L409.6 691.2h204.8zM489.0624 295.8848a25.6 25.6 0 0 1 45.8752 0l39.168 79.36 87.6544 12.8a25.6 25.6 0 0 1 17.1008 40.2944l-2.9184 3.328-63.4368 61.7472 15.0016 87.3472a25.6 25.6 0 0 1-33.3312 28.6208l-3.7888-1.6384L512 566.4768l-78.336 41.2672a25.6 25.6 0 0 1-37.5808-22.8864l0.4096-4.096 14.9504-87.3472-63.3856-61.7472a25.6 25.6 0 0 1 9.8816-42.7008l4.3008-0.9728 87.6032-12.7488zM512 365.0048l-22.1696 45.0048a25.6 25.6 0 0 1-19.3024 13.9776l-49.6128 7.2192 35.8912 34.9696a25.6 25.6 0 0 1 7.7312 17.7152l-0.3584 4.9664-8.4992 49.3568 44.3904-23.296a25.6 25.6 0 0 1 19.2-1.8432l4.608 1.8432 44.3904 23.296-8.448-49.3568a25.6 25.6 0 0 1 4.096-18.8416l3.2768-3.84 35.84-34.9696-49.5616-7.168a25.6 25.6 0 0 1-16.64-9.7792l-2.6624-4.2496L512 365.0048z" p-id="1039"></path></svg>
				</view>
				 <view>健康小常识</view>
			</view>
        </view>
        <view>
			<u-list @sroll="scrollList" v-if="!emptyShow">
				<u-list-item v-for="(item,index) in healthyList" :key="index">
					<view class="healthy-item" @click="handleToHealthyDetail(item.id)">
					   <view class="healthy-title">{{item.tipsTitle}}</view>
					    <view class="healthy-content" v-html="item.tipsContent"></view>
					    <view class="time">{{item.createTime}}</view>
					</view>
				</u-list-item>
				<u-loadmore :status="status"></u-loadmore>
			</u-list>
			<u-empty v-else text="暂无数据" mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
        </view>
        <u-tabbar
                :value="active"
                :fixed="true"
                :placeholder="false"
                :safeAreaInsetBottom="false">
            <u-tabbar-item text="首页" icon="home"></u-tabbar-item>
            <u-tabbar-item text="套餐" icon="bag" @click="handleToCombo" ></u-tabbar-item>
            <u-tabbar-item text="我的" icon="account" @click="handleToMy" ></u-tabbar-item>
        </u-tabbar>
        <!--   绑定微信用户标识     -->
        <binding-wx-popup v-if="bindingWxPopupVisible" ref="bindingWxPopup"></binding-wx-popup>
    </view>
</template>

<script>
import {getHealthyList,viewNotice} from '../../api/question.js'
import BindingWxPopup from "../../pages/bindingWx/binding-wx-popup";
import {srollTitle} from '../../utils/time.js'
    export default {
        name:'home',
        components: {BindingWxPopup},
        data(){
            return {
                active:0,
                //绑定微信用户标识
                bindingWxPopupVisible: false,
				filterParams:{
					userId:uni.getStorageSync('userInfo').userId,
					pageNum:1,
					pageSize:10
				},
				healthyList:[],
				noticeDetail:{
					tipsTitle:'',
					id:'',
				},
				status:'nomore',
				totalPage:0,
				emptyShow:false,
            }
        },
		
		onLoad:function(option){
			this.handleHealthyList()
			this.handleNotice()
		},
        methods:{
           //获取健康小常识
		   handleHealthyList(){
			   getHealthyList(this.filterParams).then(res => {
				   if(res.data.records.length === 0 ){
					   this.emptyShow = true
					   return 
				   }else{
						this.emptyShow = false
					}
				   this.healthyList = res.data.records.length !== 0?[...this.healthyList,...res.data.records.map(item => item)] : []
				  if((parseInt(res.data.total % this.filterParams.pageSize))!== 0){
				  	this.totalPage = (parseInt(res.data.total/this.filterParams.pageSize)) +1
				  }else{
				  	this.totalPage = (parseInt(res.data.total/this.filterParams.pageSize))
				  }
				   this.totalPage = (parseInt(res.data.total/10)) +1
				   if(this.filterParams.pageNum >= this.totalPage ){
				   	this.filterParams.pageNum = this.totalPage
				   	this.status = 'nomore'
				   }else{
				   	this.filterParams.pageNum = this.filterParams.pageNum
				   }
			   })
		   },
		   // 向下滚动加载数据
		   scrollList(){
			   if(this.filterParams.pageNum < this.totalPage){
			    this.filterParams.pageNum++
			    this.handleHealthyList()
			   }else {
			    return 
			   }
		   },
            handleToCombo(){
                uni.navigateTo({
                    url:'/pages/combo/combo'
                })
            },
            handleToMy(){
                uni.navigateTo({
                    url:'/pages/profile/profile'
                })
            },

            //跳转到预约体检
            async handleToAdvancePhyExam(){
				if (!await this.perfectInfoOrBindingWx()) {
				    return
				}
				uni.navigateTo({
				    url:'/pages/advance-project/advance-physicalExam'
				})
            },

            //跳转到体检报告
            async handleToReport(){
                if (!await this.perfectInfoOrBindingWx()) {
                    return
                }

                uni.navigateTo({
                    url:'/pages/advance-project/advance-finish'
                })
            },

            //跳转到预约项目
            async handleToProject(){
                if (!await this.perfectInfoOrBindingWx()) {
                    return
                }

                uni.navigateTo({
                    url:'/pages/advance-project/advance-item'
                })
            },

            //跳转到体检问卷
            async handleToTest(){
                if (!await this.perfectInfoOrBindingWx()) {
                    return
                }

                uni.navigateTo({
                    url:'/pages/physicalExam-test/physicalExam-test'
                })
            },
			//跳转到健康详情
            handleToHealthyDetail(id){
				if(Boolean(id)){
					uni.navigateTo({
					    url:'/pages/healthy/healthy-detail?id='+id
					})
				}
				
            },
			
			//获取通知公告
			handleNotice(){
				viewNotice().then(res => {
					if(res.data.records.length !== 0){
						this.noticeDetail  = res.data.records[0]
					}else{
						this.noticeDetail  = {}
					}
					// this.noticeDetail =  res.data.records.length !== 0?res.data.records[0] : {}
				})
			},
			
            //是否用户信息完善
            perfectInfoOrBindingWx() {
                const isPerfectInfo = uni.getStorageSync('userInfo').isPerfectInfo;
				console.log("uni.getStorageSync('isPerfectInfo')",uni.getStorageSync('userInfo').isPerfectInfo)
                if (!isPerfectInfo) {
                    /**
                     * 信息不完善用户弹出
                     * 1，第一次手机号登录，信息不完善，没有userId，跳转信息完善页面
                     * 2，第一次微信登录，信息不完善，没有userId，但有用户标识（openId），弹出微信绑定提示框，需要根据输入的手机或证件号查询用户id进行微信绑定，如何绑定失败表示没有用户id，则跳转信息完善页面填写信息进行保存并自动绑定
                     */
                    this.bindingWxPopupVisible = true;
                    this.$nextTick(() => {
                        this.$refs.bindingWxPopup.open(this.bindingWxPopupVisible);
                    });
                    return false;
                }else {
					return true
				}
            }
        }
    }
</script>

<style lang="less">
    .main-content{
        width:100%;
        .title{
            display:flex;
            justify-content: flex-start;
            align-items: center;
            border:1px solid #eee;
			background-color: white;
            & >view{
                font-size: 13px;
            }
        }
        .book-wrapper{
			margin:20rpx 0;
			background-color: white;
			padding:15rpx 0;
			border-radius: 15rpx;
		
            .book-item{
                display: flex;
                justify-content: space-around;
                .item{
                    display:flex;
                    justify-content: center;
                    align-items: center;
                    width:47%;
                    height:70px;
                    /*background-color: #45AE98;*/
                    background-color: rgba(66, 159, 254, 0.71);
                }
            }
        }
        .healthy-item{
           padding:10px;			
            border-bottom:1px solid #eee;
			 background-color: white;
			.healthy-title{
				width:100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
            .healthy-content{
                text-indent: 2em;
                font-size: 13px;
                color: #595454;
				height:4em;
			    display: -webkit-box;
			    overflow: hidden;
			    -webkit-line-clamp: 3;
			   -webkit-box-orient: vertical;
            }
            .time{
                text-align: end;
                font-size: 12px;
                color: #cbcbcb;
            }
        }
    }
	::v-deep .healthy-content img{
		display: none;
	}
	
	::v-deep .u-notice-bar{
		padding:2px 5px;
	}
	
	
</style>
