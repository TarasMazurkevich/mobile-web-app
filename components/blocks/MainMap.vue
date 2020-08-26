<template>
  <div id="main-map-wrap">
    <div id="userMap" class="main-map" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['ROUTE'])
  },
  mounted () {
    const self = this

    window.initMap = function () {
      let self = this
      try {
        window.DIRECTIONS_SERVICE = new google.maps.DirectionsService()
        window.DIRECTIONS_RENDER = new google.maps.DirectionsRenderer()
        window.MAP = new google.maps.Map(document.getElementById('main-map-wrap'), {
          zoom: 14,
          center: { lat: 41.85, lng: -87.65 },
          disableDefaultUI: true
        })

        window.DIRECTIONS_RENDER.setMap(window.MAP)

        window.calculateAndDisplayRoute(window.DIRECTIONS_SERVICE, window.DIRECTIONS_RENDER)

        const trafficLayer = new google.maps.TrafficLayer()
        trafficLayer.setMap(window.MAP)
      } catch (err) {
        console.log(err)
      }
    }

    window.calculateAndDisplayRoute = function (directionsService, directionsRenderer) {
      window.WAYPTS = self.ROUTE.Stops
      let obj = {
        origin: self.ROUTE.PULocation,
        destination: self.ROUTE.DOLocation,
        waypoints: window.WAYPTS,
        travelMode: 'DRIVING'
      }

      directionsService.route(obj, function (response, status) {
        if (status === 'OK') {
          directionsRenderer.setDirections(response)

          const route = response.routes[0].legs

          route.forEach((res) => {
            console.dir(res)
          })
        } else {
          console.log('Directions request failed due to ' + status)
        }
      })
    }

    console.log('ok')
    this.loadScript('https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyANuS06_tELcFo0RQ_mmgyUBt_sGJcUHUs&callback=initMap')
  },
  methods: {
    loadScript (href) {
      const oldScript = document.querySelector('[data-script="map"]')

      if (oldScript) {
        document.body.removeChild(oldScript)
      }

      const script = document.createElement('script')

      script.setAttribute('type', 'text/javascript')
      script.setAttribute('src', href)
      script.setAttribute('defer', 'true')
      script.setAttribute('data-script', 'map')

      document.body.appendChild(script)
    }
  }
}

</script>

<style lang="scss" scoped>
    #main-map-wrap {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    }
</style>
