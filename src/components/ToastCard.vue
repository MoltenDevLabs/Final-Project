<script>
  import { useToast } from "vue-toastification";

  export default {
    data() {
      toast: useToast()

      // Use it!
      toast("I'm a toast!");

      // or with options
      toast.success("My toast content", {
        timeout: 2000
      });
      // These options will override the options defined in the "app.use" plugin registration for this specific toast

      // Make it available inside methods
      return { toast }
    },

    methods: {
      myMethod() {

        // Since you returned `toast` from setup(), you can access it now
        this.toast.info("I'm an info toast!");
      }
    }
  }
</script>

<!--    TOAST TYPES
toast("Default toast");
toast.info("Info toast");
toast.success("Success toast");
toast.error("Error toast");
toast.warning("Warning toast");

// You can also set the type programmatically when calling the default toast
import { TYPE } from "vue-toastification";

toast("Also a success toast", {
    type: TYPE.SUCCESS  // or "success", "error", "default", "info" and "warning"
}); -->