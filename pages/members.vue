<script lang="ts" setup>
/* IMPORTS */

/* STATES */
const banner = ref<string>(
  'https://images.pexels.com/photos/1029606/pexels-photo-1029606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
)
</script>

<template>
  <!-- Banner -->
  <div
    :style="{ backgroundImage: `url(${banner}` }"
    class="w-full h-64 bg-cover bg-center bg-no-repeat"
  ></div>

  <!-- Membership -->
  <h1 class="text-5xl font-bold text-red-700 text-center mt-4">Membership</h1>
  <div class="py-8">
    <div class="mx-auto max-w-7xl px-4">
      <!-- Membership Section -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Corporate Membership -->
        <div class="rounded-lg bg-white p-6 text-center shadow-lg">
          <h2 class="mb-4 text-2xl font-bold text-red-700">
            Corporate Membership
          </h2>
          <p class="mb-4 text-gray-600">
            Tailored for businesses looking to integrate advanced technologies,
            gain access to exclusive events, and collaborate on innovative
            projects. Corporate members benefit from networking opportunities,
            industry insights, and tailored consultancy services.
          </p>
          <img
            alt="Corporate Membership Icon"
            class="rounded-full mx-auto mb-4 h-24 w-24"
            src="@/assets/icons/member/associate.webp"
          />
        </div>

        <!-- Professional Membership -->
        <div class="rounded-lg bg-white p-6 text-center shadow-lg">
          <h2 class="mb-4 text-2xl font-bold text-red-700">
            Professional Membership
          </h2>
          <p class="mb-4 text-gray-600">
            Designed for individuals working in the technology sector who seek
            to stay at the forefront of industry trends, enhance their skills,
            and connect with peers. Professional members gain access to
            workshops, training sessions, and a network of industry experts.
          </p>
          <img
            alt="Professional Membership Icon"
            class="rounded-full mx-auto mb-4 h-24 w-24"
            src="@/assets/icons/member/professional.webp"
          />
        </div>

        <!-- Associate Membership -->
        <div class="rounded-lg bg-white p-6 text-center shadow-lg">
          <h2 class="mb-4 text-2xl font-bold text-red-700">
            Associate Membership
          </h2>
          <p class="mb-4 text-gray-600">
            Ideal for organizations and individuals interested in supporting
            CARTA’s mission and participating in our initiatives. Associate
            members are involved in events, receive updates on industry
            developments, and have opportunities to contribute to collaborative
            projects.
          </p>
          <img
            alt="Associate Membership Icon"
            class="rounded-full mx-auto mb-4 h-24 w-24"
            src="@/assets/icons/member/coperation.png"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Our Partnership -->
  <h1 class="text-5xl font-bold text-red-700 text-center mb-4">Our Partnership</h1>
  <div class="flex flex-col items-center justify-center bg-white py-12">
    <div class="mx-auto max-w-7xl px-4 text-center">
      <!-- Partnership Section -->
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <!-- Government Partnerships -->
        <div>
          <div class="flex justify-center space-x-8">
            <div
              class="flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-orange-500 p-4"
            >
              <img
                alt="Icon 1"
                class="h-12 w-12"
                src="@/assets/icons/member/gov-partner.webp"
              />
            </div>
          </div>
          <h2 class="mb-4 text-2xl font-bold text-red-700">
            Government Partnerships
          </h2>
          <p class="mb-4 text-gray-600">
            We collaborate with government agencies to promote high technology
            education, implement technology transfer programs, and support
            policy development that fosters innovation and growth.
          </p>
          <div class="flex justify-center space-x-4">
            <img
              alt="Gov Logo 1"
              class="h-16 w-16"
              src="@/assets/icons/member/misti-logo.webp"
              />
            <img
              alt="Gov Logo 2"
              class="h-16 w-16"
              src="@/assets/icons/member/moi-logo.webp"
            />
            <img
              alt="Gov Logo 3"
              class="h-16 w-16"
              src="@/assets/icons/member/moj-logo.webp"
            />
          </div>
        </div>

        <!-- Educational Partnerships -->
        <div>
          <div class="flex justify-center space-x-8">
            <div
              class="flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-orange-500 p-4"
            >
              <img
                alt="Icon 1"
                class="w-12 h-12"
                src="@/assets/icons/member/edu-partner.webp"
              />
            </div>
          </div>
          <h2 class="mb-4 text-2xl font-bold text-red-700">
            Educational Partnerships
          </h2>
          <p class="mb-4 text-gray-600">
            Partnering with universities and research centers, we facilitate
            knowledge exchange, advanced technology training, and collaborative
            research efforts to drive technological innovation.
          </p>
          <img alt="Education Logo" class="mx-auto h-16 w-auto" src="@/assets/icons/member/cit.png" />
        </div>

        <!-- Industry Partnerships -->
        <div>
          <div class="flex justify-center space-x-8">
            <div
              class="flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-orange-500 p-4"
            >
              <img
                alt="Icon 1"
                class="h-12 w-12"
                src="@/assets/icons/member/ind-partner.webp"
              />
            </div>
          </div>
          <h2 class="mb-4 text-2xl font-bold text-red-700">
            Industry Partnerships
          </h2>
          <p class="mb-4 text-gray-600">
            We work closely with leading companies and industry organizations to
            advance the adoption of AI, robotics, and smart cities. These
            partnerships provide mutual benefits through joint projects,
            research initiatives, and shared resources.
          </p>
          <div class="flex justify-center space-x-4">
            <img alt="Industry Logo 1" class="h-16 w-auto" src="@/assets/icons/member/cognizer-cambodia.png" />
            <img alt="Industry Logo 2" class="h-16 w-auto" src="@/assets/icons/member/arm-robotics.png" />
          </div>
        </div>

        <!-- International Organizations -->
        <div>
          <div class="flex justify-center space-x-8">
            <div
              class="flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-orange-500 p-4"
            >
              <img
                alt="Icon 1"
                class="h-12 w-12"
                src="@/assets/icons/member/int-partner.webp"
              />
            </div>
          </div>
          <h2 class="mb-4 text-2xl font-bold text-red-700">
            International Organization
          </h2>
          <p class="mb-4 text-gray-600">
            By engaging with global institutions, we bring international
            expertise and opportunities to Cambodia, enhancing our members'
            access to global markets and best practices.
          </p>
          <div class="flex justify-center space-x-4">
            <img
              alt="International Logo 1"
              class="h-16"
              src="@/assets/icons/member/kar.webp"
            />
            <img
              alt="International Logo 2"
              class="h-16"
              src="@/assets/icons/member/myras.webp"
            />
            <img
              alt="International Logo 3"
              class="h-16"
              src="@/assets/icons/member/mrsp.webp"
            />
          </div>
          <div class="flex justify-center space-x-4">
            <img
              alt="International Logo 3"
              class="h-16"
              src="@/assets/icons/member/apara.webp"
            />
            <img
              alt="International Logo 3"
              class="h-16 w-16"
              src="@/assets/icons/member/automationsg.webp"
            />
          </div>
          <div class="flex justify-center space-x-4">
            <img
              alt="International Logo 3"
              class="h-16"
              src="@/assets/icons/member/china-asean.webp"
            />
            <img
              alt="International Logo 3"
              class="h-16"
              src="@/assets/icons/member/arain.png"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
