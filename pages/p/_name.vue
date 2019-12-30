<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-container>
            <v-row align="center" dense tag="section">
              <v-col cols="3" sm="2" md="1">
                <v-avatar color="primary" size="72"></v-avatar>
              </v-col>
              <v-col>
                <v-card-title>Product Name</v-card-title>
                <v-card-subtitle>Product tagline</v-card-subtitle>
              </v-col>
            </v-row>

            <v-row dense tag="section">
              <v-col>
                <product-images></product-images>
              </v-col>
            </v-row>

            <v-row align="start" tag="section">
              <v-col cols="12" md="8">
                <v-row dense>
                  <v-col>
                    <header>Description</header>
                    <p class="text-justify body-1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Debitis expedita reiciendis possimus sed, dicta ipsum
                      tempora vel, aliquid quam iusto nam. Tempore tempora
                      consequatur culpa obcaecati perspiciatis suscipit maxime
                      laborum! Lorem ipsum dolor sit amet, consectetur
                      adipisicing elit. Distinctio, aspernatur. Assumenda
                      ducimus veniam at rerum dicta? Architecto adipisci, amet
                      dolore nisi fuga omnis porro explicabo reiciendis officiis
                      unde. Magnam, placeat. Lorem ipsum dolor sit amet,
                      consectetur adipisicing elit. In, corrupti laudantium
                      officia similique libero corporis? Sequi at vel,
                      voluptatum odio voluptas nobis tempora quia saepe eaque
                      laudantium cupiditate ipsam fugiat.
                    </p>
                  </v-col>
                </v-row>

                <v-row dense>
                  <v-col cols="12">
                    <header>Makers</header>
                  </v-col>
                  <v-row>
                    <v-col v-for="i in 6" :key="i" cols="6" sm="4">
                      <maker-avatar
                        maker-name="john doe"
                        maker-profile-link="jd"
                      ></maker-avatar>
                    </v-col>
                  </v-row>
                </v-row>
              </v-col>

              <v-col cols="12" md="4">
                <action-buttons></action-buttons>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row id="comments">
      <v-col cols="12">
        <v-card>
          <v-container>
            <comment-section></comment-section>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MakerAvatar from '@/components/ProductPageMakerAvatar.vue'
import ActionButtons from '@/components/ProductPageActionButtons.vue'
import ProductImages from '@/components/ProductPageCarousel.vue'
import CommentSection from '@/components/ProductPageComment.vue'
export default {
  components: {
    MakerAvatar,
    ActionButtons,
    ProductImages,
    CommentSection
  }
}
</script>
