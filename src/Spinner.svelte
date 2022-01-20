<div class="ellipse">
  <div />
  <div />
  <div />
  <div />
</div>

<style>
  .ellipse {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }

  .ellipse div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background-color: var(--text-color);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  .ellipse div:nth-child(1) {
    left: 8px;
    animation: scale-up 0.6s infinite;
  }

  .ellipse div:nth-child(2) {
    left: 8px;
    animation: shift-right 0.6s infinite;
  }

  .ellipse div:nth-child(3) {
    left: 32px;
    animation: shift-right 0.6s infinite;
  }

  .ellipse div:nth-child(4) {
    left: 56px;
    animation: scale-down 0.6s infinite;
  }

  @keyframes scale-up {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes scale-down {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }

  @keyframes shift-right {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
</style>
