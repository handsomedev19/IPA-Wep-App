<!--
  * Author:       Rayan Henchiri
  * File name:    Info.vue
  * Version:      1.0
  * Date:         2021
  * Description:  General information about event logs (ereignisprotokolle) can be found here.
-->

<template>
    <v-container>
        <panel title="Infos">
            <div class="text-xs-left">
                <p>Mit dem vorliegenden Ereignisprotokoll wird festgehalten, dass die Lehrpersonen eine Handlung oder ein Verhalten festgestellt hat, das nicht den geltenden
                  und kommunizierten Vorgaben und Erwartungen entspricht.
                </p>
                
                <p>Mit ihrer Unterschrift bestätigen beide Parteien, dass die Lehrperson der bzw. dem Lernendenden erläutert hat, aus welchen Gründen eine Handlung order
                  ein Verhalten verfehlt ist und wie dies in Zukunft korrigiert werden soll.
                </p>

                <p>Fünf Ereignisprotokolle führen zu einer gelben Karte (PL2107VA:LE-Disziplmassnahmen_I. Grobe Verfehlungen können direkt zu einer gelben Karte führen.
                  <br>
                  Dazu zählen bspw.:</p>

                  <ul>
                    <li>Unentschuldigte Absenzen</li>
                    <li>Nicht-Einhalten von persönlich unterzeichneten Weisungen (bspw. Lehrvertrag, IT-Weisugngen</li>
                    <li>Beleidigung, Beschimpfung oder üble Nachrede gegenüer Lernenden, Mitarbeitenden und externen Partnern der TF Bern.</li>
                    <li>u.a.m.</li>
                  </ul>
            </div>
        </panel>
    </v-container>
</template>

<script>
import Panel from '@/components/Panel'
export default {
    components: {
        Panel
    },

}
</script>

<style scoped>

</style>
