<securityPage>

  <div class="securityPage container1024">
    <div class="securityCol1">
      <div class="chart"></div>
      <div class="securityInfo">
        <div class="infoClip" each={ stock.info }>
          <h1><strong>{ (info).title }: </strong>{ (info).title.clip }</h1>
        </div>
      </div>
    </div>
    <div class="securityCol2">
      <div class="strategyList">
        <div class="strategyCard" each={ strategy }>
          <numberCont>
            <number></number>
          </numberCont>
        </div>
      </div>
    </div>
  </div>

</securityPage>
