<template>
  <div
    v-if="
      (token && token.title) ||
      token.name ||
      token.tokenUri.raw ||
      token.description
    "
    class="nft"
  >
    <div
      v-if="token && getUrlProtocol(token.tokenUri.raw) === 'mp4'"
      class="nft-video"
    >
      <video width="320" height="240" controls>
        <source :src="token.tokenUri.raw" type="video/mp4" />
        <!-- <source :src="`${token.tokenUri.raw}`" type="video/ogg" /> -->
        Your browser does not support the video tag.
      </video>
    </div>
    <div
      v-if="token && getUrlProtocol(token.tokenUri.raw) === 'mp3'"
      class="nft-video"
    >
      <video width="320" height="240" controls>
        <source :src="getUrlProtocol(token.tokenUri.raw)" type="video/mp4" />
        <!-- <source :src="`${token.tokenUri.raw}`" type="video/ogg" /> -->
        Your browser does not support the video tag.
      </video>
    </div>
    <div v-else-if="token && token.tokenUri.raw" class="nft-image">
      <img
        v-if="token.tokenUri.raw"
        :src="`${getUrlProtocol(token.tokenUri.raw)}`"
        :alt="`${token.name}`"
      />
    </div>
    <div v-if="token && token.title" class="nft-title">
      {{ token.title }}
    </div>
    <!-- <div
      v-if="token && token.description"
      class="nft-description"
    >
      {{ token.description }}
    </div> -->
  </div>
</template>
<script>
/* Import our IPFS and NftStorage Services */
import { generateLink } from "../services/helpers";
/* LFG */
export default {
  name: "NftCard",
  props: ["token"],
  methods: {
    getUrlProtocol(url) {
      let protocol = url.endsWith("mp4") ? 5 : 0;
      if (protocol == 0) protocol = url.endsWith("mp3") ? 6 : 0;
      if (protocol == 0) protocol = url.endsWith("gif") ? 7 : 0;
      if (protocol == 0) protocol = url.startsWith("http://") ? 1 : 0;
      if (protocol == 0) protocol = url.startsWith("https://") ? 2 : 0;
      if (protocol == 0) protocol = url.startsWith("ipfs://") ? 3 : 0;
      if (protocol == 0) protocol = url !== "" ? 4 : 0;
      switch (protocol) {
        case 1:
          return url;
        case 2:
          return url;
        case 3:
          return "https://ipfs.io/ipfs/" + url.substring(7);
        case 4:
          return generateLink(url);
        case 5:
          return "mp4";
        case 6:
          return "mp3";
        case 7:
          return url;
        case 0:
          return "Not http or https";
      }
    },
  },
};
</script>
<style lang="scss">
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

.nft {
  display: inline;
  float: left;
  box-sizing: border-box;
  width: 230px;
  background: #f4f4f4;
  border: 2px solid #f4f4f4;
  border-radius: 15px;
  margin: 0 13px 25px 13px;
  padding: 10px;
  transition: 0.4s;
  cursor: pointer;

  @include breakpoint($break-md) {
    width: 380px;
    padding: 20px 20px 10px;
  }
  @include breakpoint($break-sm) {
    width: 380px;
  }
  @include breakpoint($break-xs) {
    width: 380px;
    margin: 0 auto 20px;
  }

  &:hover {
    border: 2px solid #8d50f5;
  }

  .nft-video {
    width: 100%;
    margin: 0 auto;
    padding: 0;
    overflow: hidden;
    background: #f4f4f4;
  }
  .nft-image {
    width: 100%;
    margin: 0 auto;
    padding: 0;
    overflow: hidden;

    img,
    svg {
      width: 100%;
      height: 100%;
      object-fit: contain;
      overflow: hidden;
      @include breakpoint($break-md) {
        width: 360px;
      }
      @include breakpoint($break-sm) {
        width: 320px;
      }
      @include breakpoint($break-xs) {
        width: 300px;
      }
    }
  }

  .nft-title {
    color: #1a1a1a;
    width: 100%;
    font-size: 14px;
    font-weight: normal;
    text-transform: uppercase;
    text-align: center;
    margin: 10px 0 0 0;
  }

  .nft-description {
    color: #1a1a1a;
    width: 100%;
    font-size: 12px;
    font-weight: normal;
    text-align: center;
    margin: 0;
  }
}
</style>
