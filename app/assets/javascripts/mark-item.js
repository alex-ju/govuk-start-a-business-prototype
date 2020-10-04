window.GOVUK = window.GOVUK || {}
window.GOVUK.Modules = window.GOVUK.Modules || {};

(function (Modules) {
  function MarkItem () { }

  MarkItem.prototype.start = function ($module) {
    this.$module = $module[0]
    this.$item = this.$module.closest('.app-result')
    this.$mark = this.$module.getAttribute('data-mark')
    this.$id = this.$module.getAttribute('data-id')
    this.$module.addEventListener('click', MarkItem.prototype.handleClick.bind(this), true)
  }

  MarkItem.prototype.handleClick = function (event) {
    this.sendRequest(this.$mark, this.$id)
    document.forms['next-steps'].submit()
  }

  MarkItem.prototype.sendRequest = function (action, param) {
    var http = new window.XMLHttpRequest()
    var url = '/' + action + '/' + param
    console.log(url)
    http.open('GET', url)
    http.send()

    http.onreadystatechange = (e) => {
      console.log(http.responseText)
    }
  }

  Modules.MarkItem = MarkItem
})(window.GOVUK.Modules)
