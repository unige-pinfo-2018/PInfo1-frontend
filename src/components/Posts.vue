<!-- Author: @GiovannaTheo -->
<!--This file contains the layout for the section last posts-->
<template>
  <section>
    <vue-particles
      color="#FFFFFF"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <!--THIS IS THE TEMPLATE THAT ALL NEW POSTS WILL USE-->
    <article v-show="false" class="media" id="template">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="imageHere" style="border-radius: 50%;">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>Name Here</strong> <small>UserName Here</small> <small>Date Here</small><br>
            Text of post here
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-right">
            <a class="level-item">
              <b-icon
                pack="fa"
                icon="heart"
                style="color: orangered;"
              >
              </b-icon>
            </a>
            <a class="level-item">
              <b-icon
                pack="fa"
                icon="thumbs-down"
                style="color: #000"
              >
              </b-icon>
            </a>
          </div>
          <div class="level-left">
            <a class="level-item">
              <button class="button is-outlined"
                      style="color: #2196F3; border-color: #2196F3"
               >Answer</button>
            </a>
          </div>
        </nav>
      </div>
      <div class="media-right" style="text-align: center">
        <b-icon
          pack="fa"
          icon="comment"
          style="color: #44c784"
        >
        </b-icon>
        <p>2</p>
      </div>
    </article>
    <div id="tags">
      <div id="tag" v-on:keyup.enter="getColor">
        <h4 style="margin-top: 20px; color: #000000;">Search for tags</h4>
        <b-taginput class="myTags" style="border-radius: 25px; max-height: 430px; margin-left: 15px; margin-top: 15px; margin-right: 15px; margin-bottom: 52px"
                    v-model="tags" rounded
                    type='color'
                    maxtags = "20">
        </b-taginput>
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column" id="posts">
        <article class="media" id="1">
          <figure class="media-left">
            <p class="image is-64x64">
              <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEhMWFRUXFRcVFxUXFxcVFRcXFxcXFxcVFRcYHSggGBolHRcXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0lHyYrLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAgMEBQYBBwj/xABCEAABAwEEBgYHBQcEAwAAAAABAAIDEQQSITEFBkFRYZETIlJxgaEHMkKxwdHwFCNTYpIVM0NygqLhc7LC8TRjs//EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACURAAICAgMAAQQDAQAAAAAAAAABAhEDIRIxQRMEMlFhIkJxUv/aAAwDAQACEQMRAD8A9xQhCABCEIAEIQgAQuE0xKotJaysZVsQ6R2/2B4+14c1MpKPZUYuXRfEqstenoI8L947mdbzy81kLbpKWb13mnZGDeW3xUW6ueX1H/KNo4PyaG0a2OP7uMDi418hT3qvm05aHfxCODQB50qq8BKAWLyyfpqscV4OPtUrs5Hnvc75pok7SlhqA1RZdCBXeU8y0yDKR47nH5rl1cuosKJkWmZ25SE94DverCzazvHrsa7uq0/FUt1coqWWS9JcIvw2Nl0/C/AksO5woOeSs2uBFQajeF55RSLJa3xnqOI4bPEZLaP1L/sjKWBeG8QqKwawg4Si6e0MvEZjzV2x4IqCCDkRiF0xnGXRhKLj2KQhCokEIQgAQhCABCEIAEIQgAQhCABQtKaUjs7bzzicmj1ndw+Kiae042AXW0dIRg3YOLuHDasLaJXyOL3uLnHMn3cAscmXjpdmuPFy2yz0hpmS0HHqs2MGXifaKhtauRtTjQuOUm3bOpJLSEhq7dS6LtFIxIalUSgF0BAxNEqiUAu0SEIoiicogBACKIupyiKIARRF1LoiiAEAKXYbc+I1YcNrTkfremKICabW0Jq+zX6O0kyUYYO2tOfeN4U1YVriCCDQjIjBaTRGlukox+D9h2O+RXZiz8tS7ObJiraLZCELoMQQhCABCEIAEIQgAVTp/S4gbRtDI7Ibh2ipelLe2GMvOJyaN52BYKeV0ji95qTifrcsM2XjpdmuLHy2+iPIS5xc41JNSTmTxXWMToYlBi47OsGhLC61iWGpAJou0Sw1dupAIDUrJdJpsqTkE/DYycTn5Du+aAshSWimTSfL/KZc6U5ADwr7yr5lhAThs+CvgyeSMnbJZW+0R4D5KpfrBKw4kGmxzR8KFa/SNnqKLE6asZrknGumDLew60RPoJOod+bOezx5q+YQQCDUHIg1B7ivJJWlpVhoXTslnPVN5m1hyO8jsnjzqqli/AKR6YiiY0bbWTxiSM1B2bQdrXDYVKLViUJoiiXdRdQAhCVdXLqANHoXSd/qP9YZHtD5q2WHaSDUGhBqDxWr0VbulZj6wwcPiO9duDLy/i+zly462iahCF0GIIQhAAuE0xK6qHWy3XWCJvrPz4MGfPLmplLirKjHk6KLTWkDPJUeoMGDhtPj8lCAS2RJwRLzpSt2ztSSVIaASw1OiJKESkYgNSmhOiNKESAGg1donhGu2eO8/g2g/qOPupzQlYrHLLZqYnM/VBwU6Ji61ikMaumETGUhNxJLU+E29aNE2QbXDVZ3Sej61wWnkNVXW1wu71zzW7NYs8v0zZAwkKhvUWu1ojNe9Y97aFawdobL3VzTJs0gd/DdQSN4docRnzC9PicHAOBqCAQRkQcQQvFWOXono+0hfidCc48W/wAjtnga8woyw9BM1QC4Uu6u9GsaKsbouEJ24i4igsYonrJaTG8OHiN42hBYuXE1adoHTNhFIHAOGIIqEpU2gbRnGe9vxHx5q5XoQlyjZxSjxdAhCFZILJ2ucSSOfxoO4ZfXFXGstpdHZ3XCA91GNrljn5VWQgbP2m/p/wArl+ol0jowx9LYd3klADcoLWTdpv6T80oMm7Tf0n5rCzWicKbkoAbgoIbN2mcj80oNm3s5H5p2Kie0DclCm4KCBNvZyPzSgJvyciny/QqJuG4KJo01F7K9V3M1HkmrU6YMcep6p37ipNhwjB4J3bCqRMiCfAWcm0jMCbgBAPZdWnGqadrFLFR0kRc0ipLQaCmeJAHgaKo5ES4M07mKPISCs/Fr5A40uvHE0p48K4VFfMKzsWlGT0czLDMZbwe5VKSEosekByVVbARgrZ0wvHcsprHrFC3qh4r3E0z3fWKxkr6NIlNp8VxOJHxWJtrTXFaG26bhpQVeTmceWKztrtAeahaY00NjbVqNQLXctkYOTw6M/wBQq3+5o5rMRqx0PIWzwuGyaM8nhWxHuQibuXejbuUYzSD+H5hH2l/4Z5hZ8kTTJBibuXOibuTH2l/4R5hH2l34Z5hHKIUx7oWrhiCaNpd+G7yXPtR7DvJFxCmSI2hrg4Zg1V+x1QCNqy/2o9h3krnQ1pvtIoRdO3cforXFJXRnki6ssEIQugxMhrtIHPjjqeqC80NPWwHuPNVtlsw4/qK5rBPftcm5pDR4AV86p2yFefldyZ241UUS2WZvHmU4LMOPMpUaeASSQm2MizDeeZShZhvdzKeCUAq4oVsZFmG93MpQs43u5lPAIeMD3KuKFbK62ubcf1nVpka0IrTCuasrHBRjQRsVdoMvdZ2CYhzjkaY3SeqHcbtFeRjBOEd2KT8MdrVpt8HVhjqSCS6laAbhwxNTw31FNoO2261NeWXSGtBNCxgJcSLlSxwDsDgdnevQrRYg7YDwO1VtuZJEy7BEGg7Gmja7TQDNJxrtDUr6MTZ7GS9zZoiDxaGEHaDdJbjvGBW50DYQ2PIAU6oGOG8neoGgbBK5wdO0EDGpcTvwApxJ5bgr23T3GmmFAlFf2Y5PxGG1r1kEF5jaFxwA3cSvNLVanSElxxKsdZJhJaJHDtJGgdByWp7hHcNwBzmveWFwNRRtMa8dlVcEoqxsZ0fo2/1nerSpDXxl9Mq3b16n9JUe2wNaeq6oyxwIO0FeiTaGii0eIZhHJKKkYBpaXY0a8jz3krze0xOaaOOPeHeYKcZWwFWcKy0VEX2iFgzMsY5vHzVfZgtd6PLEJLcCco2uk/4jzcD4JsR6mY3V9byCOjd2vIJ6i7RTxIsY6N3a8kdG7teSfoiifELGLjt45Ll128clIXKI4hZHuu3jkpejHOD6GlCP8puiVCaOB4hOKp2J7RcoQhdJgeWzSXppHb5Hn+4qzsq88jtpJJo/Ek5u3q1sltPZl5uXnyidyZ6DCnwsbZ7c7sy/3Ke22O7Mv96SlQnGzTBKCzItjuzL/clNtx7Mv9yfP9C4GmASZfVNM6GnfsWeFuO6b+75J+y22rgKSY7SHU8cEfILgWMTBGY4W4MYyneQAB7iraLJU9rhLSJAahzhUbjR2XDEq1s78Atcb20RPoeSaJRKZMuOC1bIQqV90e5ZrWq0FkLnGuX0UaxayCCRrBDLK4ipDG1ut3rPa+6yNMfQiokoKtILSGuFQSCFjN8tGsFR5y59STvKm6DtJhnY9uRN1w3g/QVaHAp6zSYimYxWjWhnounNHzyMox5oRw2hef23RUkbqPB7165q9pAT2ZriBeAofBY3W609YgkV/wC1hBtOinsyUDaFTodIywPcYZDGXMuOLcCWnGldmzEYhQ40i0Pq+uzBbEnpXortT3xzNcXOa17S2pJoXAl1K9wPit6F516OZxHZ39e7WY7K1o1i1g0oPxPILP5EnQnFsuqLlFUftQfiDkj9qj8Qck/lQuDLaiKKq/ag/Eby/wArv7T/APY3kj5UHBlmuFVv7R/O1H7Q/O1HyIODNL06FQftH8zV1afOiPiZ53ZmUJG6qubI1RJobs0jd0jxycQrKyNXLI6UWVmU5oUWBqmAIgTI6lBASgtEQdCUAuBLCoRC0nJ92GkGoewg0qD1gKE7DQ7VH0pbHQxxTgEtjeDKAKkxua5hcB+Uua7uaVOt4+7Ph/uCIYgWkOoQQQRsIOGI7lO+Q/Ctt+t9kY0Hp2urk1vWdjvHs021os9b/SIA2kMZDjWjnXcON0E18aKt1o1TdA+sF5zXE9XDq5nxGzxWajsFpcaNgkNcvuzd760pXDM1V9+jSHLXph8r7zjedmTXPgfoq2itv2qzXZWsd0ZAa8jFjK1ILsw3Chxw999oqyS2WL7uwkupV8hfGZHHvDiQ3ZdrzzVfbtN2hlT9ndExzetSMG8doJaDhluUN30UYG13amjbuOVSfeiE7gpWkZoi4PaN4c3LuIHDKnAKtOBw+u5braEbjVHSDo2uFaDcVRaetwlkJGVSORIUWzaZka0twNRSp2cRTaopcoUKlYWPB2CC2uO5IOGeC1OqWqUlqcHODmQYVeRQvHZjrn/NkO/BMRuvR3ZrthjLh6znvFc6FxAPiAtN0beyOSIYg1oa0ANaA0AZAAUACcCEjNsR0LeyOQXOgb2RyCdQU6QrGTZ29kcgk/ZmdhvIJ9CKQ7ZHNlZ2G8guGys7A5KRRcKXFBbGfsTOwOSFadAhX8f6J5mC09Zrtql4uvfqAJ8yU5ZWq41ssv3rH9pt3xaa/HyUCzsXJlVSaOiDuKJUIUgJqNOAoiJjgSmpAKWCrRIsJQSAUoFUIbt37t3AVw4Y/BMWeSow+ippFRQqhsNoLHujdi5pu1OFRmCBTGoxUT07Kj1Ra1BdUjhl8dykgAqCyUXsSKbh7/repMZ9/wBeKcWJopdPWu0Rg9HdpTbgsvPp+Z15paMMDQEjjt7ua9BtVja8YgEHzWB0+wQPeWjMDDLYpa3spPRidOEvcXOpeJqaDgD/AIVdZYrzg0mmeJw2b+S0mnLayRrbjKYXnHD1vlj9UWcLqFbxegF2ixOjdR/kuMCJZi8ipJ2YqTo2xvmkZEwdZ7g0eJzPAZngCq/0R6h6MtEhlmdM9oJmdhUexGSBn+a8eS2oTNksrYo2RM9VjWsb3NAA9yfCkzbBdQiiYjqChcKYgXF1CBnF2NtSBxQU7ZG1d3YoXYmT0IQtzIrtPWe/Ed7Te+B8ieSzsYWycK4FZS0w3Hlu44d2zyXH9THakdGGWqAFKBTQKUCsEzUdBS2lNApQKpMVDwKUE0ClAq0yR4FZ7WuyvJZLF64BFNjmg5HuqceKvgU1axW74ok9AuzCwa0C9R3UeCAQ7AjGuPDNXUesEVAQ/EYAYAVPDMDYomsmrjZheoLwr38MuAqsHbtESxnqucQO8U+sFMYxf6LPRJdZBcrf2cRuy8+SyWn9Kte09o5YZjDDkPIrKSSyDMnx/wApiSUnMlaLF7YrHJrUT9dyYqklAW1AOtW79E9kD7U+QivRxG7wc9wbUf03x4rBtK9O9Dsf/ku/0R/9SkyX0ejIXVxIzBdXF1MAXCuriBAhcXEhilLsTcCd6iAVNFZMbQUVwREhSEIWpAKo0/ZqgSDZge7YefvVuuPaCCDiCKEcConHlGioy4uzGgpYKVb7OYnlpyzB3hMNcvNdp0ztW1Y+CltKYa9KD0WKh8OSwVHD0oPVchUSA5RZrW1xcxpq6Msv7QOkvXQePVrTiN4UbS2kRBDJKcQxpNN59lviaDxUX0faOL7A+VxvS2iV0pJ3tddaOAN0917gtIpzTJf8dltmOB7+GX1tUK16Na7EiuzKte9S4DSrdozacCDuI2JTSTXzxy+azKMtpfVaOQEgGuB6uIpXGm2gWLt+qkjfVIOJwy3b+9etOmu7qZd579yptY5GNaXOpw2UrTPeqjNroKPILTZnRuuuFCkBqmW+S/ITifEk8ziuMgqumySMwLTauW2azxzWiE06J0W3qv6xvscNouOx3YHMBVtj0VJM8RwsvHMkZNaM3vOxo+ti2GkLGyCwSRMxa2N1XHN73ZuPwGwAKJy6Q0j0TROkmWiFk0fqvbUbwci08QajwUteVejbWeOEOs0zrjS6/G9x6oJoHMJ9kGlQThUneF6e2SqqzNqh1dSKroKZIpcKKpJKLA6SuVSS5djBcQAlYyXYo8b27JTUmNlAAEpdEVSMW7YIQhMQIQhAELSthErKe0MWnju7iskagkHAjAg71ulT6d0V0gvsHXGY7Q+a5s+Ll/Jdm2LJWmZ4OSqplu5Qrdpyzw16WZoI9kdd/wCltSPFcVX0dRaXl0vABJIAAJJJoABmSdgWIt3pAaMIISfzSGg/Q0/8gs5pLWW02gFsknUObGgNae+mLh3krSOGT7Jci51w1pbOwwQirKgukOF66agMG6oBqc6ZbTq/RBpW9Z3wH+E+o/kkq4H9QfzC8nJTnTubE9jT1X3RIO01rmuYCNweK94C6YxUVSIls+gtNRQu9aZkUgyLnNFRucCRUe7mDUR2nYbppUVa4OaeDXDA92BFRUBeHxMq1zyRWoFDmTmntHaTlgdfidSvrNOLHgHJzdvA5iuBBxSnBS36KKcT2W2WjCtBgK1rQrDayOMpPWeBTLP4Ky0NrNDaG3XFscm2NzrrXbPuZDt/I41zoXKXNZY5R931iDk2jiNmzLxXOk4vZdo8+ZZqH4q60FoGa1PuwijR+8kdgxg2lx2ncMzzI2UGpsUYE1ulbHHhRgcG12gF428G1PFV+sOutnjaIIIT0TcmYwxv4uwvuHCja710b9Iu+i/0aIoGGz2OIyg/vZj7ZyxIzGdBlu3mh15hkjszy8AXm4NGwVCzB9IdubVrJI42bGshjDW/y3gTzJVrrNpeW0WGOV/Wc+Joe6gHW9o0GAqQeCmUdpscdGByV1oLSM99kTLRMxnW6rJHNwa0vLWitATSgwzdkclTylSLFBJhLGQ0tcHNN4NcC0ghza7jTxWj6A9g1A079pZSR1XjAAm8CBiKOOJNMesSTQ44GmqttmddJjN11MKi82vEVHkQvA7Fpmazztma0MfUOdQFjZaUJDmjqitPZAGNQF9BWC1NmjZKw1a9rXtPBwqPeiMdUZz07PNLdrzarLKYrRZ43UycwujvDtAOvcv+1YWD0hWWTCTpIj+Zt5vNlTzCvtbNXorS268dYVIIID28R5cF4vpyxPsszoZKG7QhwwDmkVa4bu7YQVNbplqmrR7XYtJwzfupY5ODXAkd7a1Cv7DZ7oqcz5cF556NdS6XbZaW0PrQxuGI3SvG/cNmedKemrWEK2zGcvECEIWpmCEIQAIQhAAhCEAYv0h6qzWqO/ZZHNkaDeiDrrJuBOx+6podtMx4ZLC5jnMc0sc03XNIukEZgjYvqdZfXDUqC3i8aRzgUbKBWu5sjcL7fMbCocPwawyVpnz6QdicB7vr681Yaxav2ixSXLQy7X1XjGJ/8jqZ8DjwVYCoNhxoTokuseaA4sbjuN8keNwJlpXY5A09YVa7BwywqDUHYQcikA3LFQBwxacjtwzaeIqOYORSWjipVvsnRkBrqteA4d2IoeIxH/aas9mc+t0Vpmdg7yi9DO2ZjLzekJDSSHUxIG/HDP3KVbtENacHscylWOJAvNrgQDj4ZhWNh1fvg0vONDUsZ0lQey1uIpvNfDas6oThrniKVzRtMTmEcbpqT35KeSvsCuhme1tGmobVol6zqCp6sYPqNJxyzSG6Oc49eRra43n3/MgFSBG+J9+MsDgACw7aUza7PLgdyY0rbTJsoK+r2TtHH6ySXegFN0OCCenjoGl23YMAN9aLSw2cO0ewuOAhe6nEl134UWHK0+qmlHPLbHJVzXeocSRQEhh/JjWvs0plkpp1YIztljvuxyAqfrxVi2YgYnHdTAgimHgaeKrYJOjeHUrQmo3jJW0sJLQ9vWaa0cBStMCMMjwPFXIRHYXOcI2Gt9wFNhJwFeGK3xjljs7LMJXmNgIp6oNSTQ0zxJoDXYFiNBitpgrn0jduzZ8RyXpxsTpJGxtaTUV20oKipOzHescjdpIar0pNXLULFI9zmVbKy4adUlwcC041rmf1LSaI1M6a0/bbWLwAb0MLh6oFXB0oObgSaN8TjgNFovV+OMte8B8jcQaYNOHq8cM/crlb48bW5GM8niBCELcxBCEIAEIQgAQhCABCEIAEIQgBi3WKOZhjlY2Rjs2uAIPgV5hrN6Js32F/HoZCeTJDj4O/UvVkJNWUpNdHzFb9GzWZ/RzxujducKVptacnDiKhRHipC+obZY45mlkrGyNObXtDhyKw+mvRTZJauge+zu3D7yP9LseTgFDgarKvTIWnU9osVntL5HOGUlbrWxMqQQBm994XRjidm0MaK0XPaH0giIYKUjbS61uy840F6mZJqSSV6jo/VgNAbMRIxjzJGyp6MOdi5xaRib14gEkC+5aCizWNvsHkozGrmqjbOY5akSi8XtaasN5pFMq4YY7SFonRt3BOqJabW2IXpDQVAqcqn4K6UUZ25McmibSpWW1i1UgtmL2lkgpSRvrdzwcHjgfAhatlH9bMDAfElLexJxvaGpUeE6Y1DtFmJc5okiya9hwx7YOLPPYKlP6n2FzZMMnYBjRee89+dM17O+IOa6N7bzXChByIOwrlj0TDE4vjiYxzhQkCmG4AYDwUvG5aL+Sj5y0zZTHPLGRQskcLu7rHDBNaMExkDIGue93sNaXk8aD34UqvbbR6N7NLaZLTO97+keX9GCGMFaYEjrHwIWo0ZouGztuQRMjbua0CvFxzJ4laKH5B5Uea6s+jWVzmT2p3Q0x6Jha6THe8YN34VPcvUbNZmRtDWNDQNg+sU6hUopGUpNghCFRIIQhAAhCEACEIQAIQhAAhCEACEIQAIQhAAhCEACEIQBwqi1w/8c/zx/72rqFGT7WVDtDep/qS/wCs/wB60AQhLF9qHP7mdQhC0IBCEIAEIQgAQhCABCEIAEIQgAQhCAP/2Q==" style="border-radius: 50%;">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                <br>
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-right">
                <a class="level-item">
                  <b-icon
                    pack="fa"
                    icon="heart"
                    style="color: orangered;"
                  >
                  </b-icon>
                </a>
                <a class="level-item">
                  <b-icon
                    pack="fa"
                    icon="thumbs-down"
                    style="color: #000"
                  >
                  </b-icon>
                </a>
              </div>
              <div class="level-left">
                <a class="level-item">
                  <button class="button is-outlined"
                          style="color: #2196F3; border-color: #2196F3"
                          @click="isVisible = true; injectComment($event)">
                    Answer
                  </button>
                </a>
              </div>
            </nav>
          </div>
          <div class="media-right" style="text-align: center">
            <b-icon
              pack="fa"
              icon="comment"
              style="color: #44c784"
            >
            </b-icon>
            <p>4</p>
          </div>
        </article>
        <article class="media" id="2">
          <figure class="media-left">
            <p class="image is-64x64">
              <img src="http://www.abbieterpening.com/wp-content/uploads/2013/10/profile-pic-round-200px.png" style="border-radius: 50%;">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>Meera Mcconnell</strong> <small>@mcconnell</small> <small>2w</small>
                <br>
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-right">
                <a class="level-item">
                  <b-icon
                    pack="fa"
                    icon="heart"
                    style="color: orangered;"
                  >
                  </b-icon>
                </a>
                <a class="level-item">
                  <b-icon
                    pack="fa"
                    icon="thumbs-down"
                    style="color: #000"
                  >
                  </b-icon>
                </a>
              </div>
              <div class="level-left">
                <a class="level-item">
                  <button class="button is-outlined"
                          style="color: #2196F3; border-color: #2196F3"
                          @click="isVisible = true; injectComment($event)">
                    Answer
                  </button>
                </a>
              </div>
            </nav>
          </div>
          <div class="media-right" style="text-align: center">
            <b-icon
              pack="fa"
              icon="comment"
              style="color: #44c784"
            >
            </b-icon>
            <p>0</p>
          </div>
        </article>
        <article class="media" id="3">
          <figure class="media-left">
            <p class="image is-64x64">
              <img src="http://thehumannetwork.ca/assets/janedoe-7a404825c2d789762e97ca049c85089019454bd67842c2d7fdd2d0ab23135f47.png" style="border-radius: 50%;">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>Lexie Bell</strong> <small>@lbell</small> <small>3d</small>
                <br>
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-right">
                <a class="level-item">
                  <b-icon
                    pack="fa"
                    icon="heart"
                    style="color: orangered;"
                  >
                  </b-icon>
                </a>
                <a class="level-item">
                  <b-icon
                    pack="fa"
                    icon="thumbs-down"
                    style="color: #000"
                  >
                  </b-icon>
                </a>
              </div>
              <div class="level-left">
                <a class="level-item">
                  <button class="button is-outlined"
                          style="color: #2196F3; border-color: #2196F3"
                          @click="isVisible = true; injectComment($event)">
                    Answer
                  </button>
                </a>
              </div>
            </nav>
          </div>
          <div class="media-right" style="text-align: center">
            <b-icon
              pack="fa"
              icon="comment"
              style="color: #44c784"
            >
            </b-icon>
            <p>2</p>
          </div>
        </article>
        <article class="media" id="footer">
          <footer style="background-color: white; margin-right: auto; margin-left: auto">
            <button class="button is-outlined" style="color: #2196F3; border-color: #2196F3" v-on:click="injectPost">Load more</button>
          </footer>
        </article>
      </div>
    </div>
    <div id="answer" v-show="isVisible">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <article class="media" id="commentBox">
                <figure class="media-left">
                  <p class="image is-64x64">
                    <img id="profilePictureComment" src="https://bulma.io/images/placeholders/128x128.png" style="border-radius: 999px">
                  </p>
                </figure>
                <div class="media-content">
                  <div class="field">
                    <p class="control">
                      <textarea class="textarea" placeholder="Add a comment..."></textarea>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control">
                      <button class="button">Post comment</button>
                    </p>
                  </div>
                </div>
              </article>
              <article class="media" id="footerAnswer">
                <footer style="background-color: white; margin-right: auto; margin-left: auto">
                  <button class="button is-outlined" style="color: #2196F3; border-color: #2196F3" v-on:click="isVisible=false; deletePost($event)">Close</button>
                </footer>
              </article>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  /* eslint-disable */
  name: 'Posts',
  created: function () {
    this.$store.commit('switch_background', require('../assets/bg-black.jpg'))
  },
  data() {
    return {
      isVisible: false,
      tags: [],
      colors: [
        'is-info',
        'is-success',
        'is-warning',
        'is-danger'
      ],
      counter: 0,
      postContent: [
        {
          text: "This is the new text",
          profilePicture: "http://acevasupportservices.com/wp-content/uploads/2014/11/profile-pic-round-300x295.jpg",
          numberOfComments: "10",
          name: "Taha Ponce",
          username: "@tahaponce",
          date: "3y"
        }
      ],
      posts: [
        {

        }
      ]
    }
  },
  methods: {
    deletePost: function (event) {
      /* Gets the section that contains the post */
      let ans = event.target.parentElement.parentElement.parentElement
      /* Removes the previous injection */
      ans.removeChild(ans.firstChild)
    },
    injectComment: function (event) {
      /* Retrieves the ID of the post from which the function was triggered */
      let callID = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("id")
      /* Retrieves the post */
      let post = document.getElementById(callID).cloneNode(true)
      /* Removes the answer button */
      post.getElementsByClassName("level-left")[0].getElementsByClassName("level-item")[0].innerHTML = ""
      /* Retrieves the answer window */
      let answer = document.getElementById("answer").getElementsByClassName("modal-container")[0]
      /* Injects the comment from which the button was triggered in the answer window */
      answer.insertBefore(post, document.getElementById("commentBox"))
      /* Sets the profile picture of the user logged in */

      // TODO: connect to the database to retrieve the true profile picture (link) of the user logged in

      document.getElementById("profilePictureComment").src = this.$data.postContent[0].profilePicture
    },
    injectPost: function () {
      /* Gets all posts */
      let posts = document.getElementById("posts")
      /* Deep clones the template so we can inject it in our existing posts */
      let newPost = document.getElementById("template").cloneNode(true)
      /* Sets unique id */
      newPost.id = document.getElementById("posts").getElementsByClassName("media").length
      /* Sets the profile picture of the user */
      newPost.getElementsByClassName("media-left")[0]
        .getElementsByClassName("image is-64x64")[0]
        .innerHTML = "<img src=" + this.$data.postContent[0].profilePicture + " style=border-radius:50%>"
      /* Sets the name, username and date of the user / post */
      newPost.getElementsByClassName("media-content")[0]
        .getElementsByClassName("content")[0]
        .innerHTML = "<p><strong>" + this.$data.postContent[0].name + " </strong> <small> "
        + this.$data.postContent[0].username + " </small> <small> "
        + this.$data.postContent[0].date
        + " </small><br>" + this.$data.postContent[0].text + " </p>"
      /* Sets the number of comments of the actual post */
      newPost.getElementsByClassName("media-right")[0]
        .innerHTML = "<span class='icon' style='color: rgb(68, 199, 132);'><i class='fa fa-comment fa-lg'></i></span> <p>"
        + this.$data.postContent[0].numberOfComments + " </p>"
      /* Sets button action */
      newPost.getElementsByClassName("media-content")[0]
             .getElementsByClassName("level is-mobile")[0]
             .getElementsByClassName("level-left")[0]
             .getElementsByClassName("level-item")[0]
             .innerHTML = " <button class='button is-outlined' " +
                          "style='color: #2196F3; border-color: #2196F3' " +
                          " @click='isVisible = true; injectComment($event)'> " + "Answer" + " </button> "
      console.log(newPost.getElementsByClassName("media-content")[0]
        .getElementsByClassName("level is-mobile")[0]
        .getElementsByClassName("level-left")[0]
        .getElementsByClassName("level-item")[0]
        .innerHTML)
      /* Allow the post to be visible */
      newPost.style = ""
      /* Appends the new post to the existing ones, before the footer */
      posts.insertBefore(newPost, document.getElementById("footer"))
    },
    getColor: function () {
      /* Makes sure we never have too much tags */
      this.$data.counter = this.$data.tags.length
      /* Picks a random number */
      let r = Math.floor(Math.random() * Math.floor(4))
      /* Picks a random color */
      let color = this.$data.colors[r];
      /* Changes the color of the tag */
      document.getElementById("tags").getElementsByClassName("myTags")[0]
        .getElementsByClassName("taginput-container is-focusable")[0]
        .childNodes[this.$data.counter-1].className = "tag " + color + " is-rounded"
    }
  }
}
</script>

<style>
  #tags {
    bottom: 23%;
    width: 100%;
    height: 60%;
    text-align: center;
    position: fixed;
    left: 10%;
  }

  #tag {
    background-color: white;
    color: black;
    border-radius: 25px;
    border: 2px solid #FFFFFF;
    max-width: 400px;
    max-height: 400px;
    position: fixed;
    left: 5%;
    top: 25%;
  }

  #posts {
    background-color: white;
    border-radius: 25px;
    max-width: 700px;
    left: 40%;
    top: 25%;
    max-height: 400px;
    position: fixed;
    overflow-y: scroll;
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    width: 700px;
  }

  .modal-container {
    width: 700px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 25px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    max-height: 400px;
    overflow-y: scroll;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

</style>
