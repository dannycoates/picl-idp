/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var test = require('../ptaptest')
var TestServer = require('../test_server')
var Client = require('../client')
var config = require('../../config').getProperties()

TestServer.start(config)
.then(function main(server) {

  test(
    'create account with new device',
    function (t) {
      var email = server.uniqueEmail()
      var password = 'allyourbasearebelongtous'
      var device = {
        name: 'test device'
      }
      var client = null
      return Client.create(config.publicUrl, email, password, {
        device: device
      })
      .then(
        function (x) {
          client = x
          t.ok(client.authAt, 'authAt was set')
          t.equal(client.device.name, device.name, 'device set')
          t.ok(client.device.id, 'device has an id')
          t.equal(client.device.uid, client.uid)
        }
      )
      .then(
        function () {
          return client.devices()
        }
      )
      .then(
        function (devices) {
          t.equal(devices.length, 1)
          t.equal(devices[0].name, device.name)
          return client.updateDevice({
            id: client.device.id,
            name: 'new name'
          })
        }
      )
      .then(
        function (d) {
          t.equal(d.name, 'new name')
          return client.deleteDevice(client.device.id)
        }
      )
      .then(
        function () {
          return client.devices()
        }
      )
      .then(
        function (devices) {
          t.equal(devices.length, 0)
        }
      )
    }
  )

  test(
    'teardown',
    function (t) {
      server.stop()
      t.end()
    }
  )
})
